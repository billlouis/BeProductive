import firebase from 'firebase/compat/app'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE,USERS_DATA_STATE_CHANGE ,USERS_POSTS_STATE_CHANGE, CLEAR_DATA, USERS_LIKES_STATE_CHANGE,USERS_ADD_TASKS, USERS_DONE_TASKS, CLEAR_TASKS_DATA} from '../constants/index'

//this is tasks action generator dummy
//dont use this
const taskdefaultaction={
    type:"",
    posts:[],
    postId:NaN,

}
export function addTasks(newtaskarray) {
    
    return((dispatch) =>{
        //can give a sequence of dispatches
        //this method is for async actions

        //1. dispatch the changing
        console.log(title,notes,category);
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('task')
            .add(...newtaskarray);

        //2. async call to store in database
        //3. after succesful write we will update our state(for ui site)
        dispatch({
            type:USERS_ADD_TASKS,
            posts:newtaskarray,
        });
        //4. think about error handling
        //5. after done remove the changing state
    }
    );
}

export function doneTask(taskid) {//toggle
    return((dispatch) =>{
        //getting a ref
        let refoftask=firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('task')
        .doc(taskid);

        
        //toggle the done in db
        //also return the newest done (true false value)
        refoftask.get()
        .then(async targettask => {
          // Processing 1st data
          let updated = {
            ...targettask,
            done: !targettask.done
          };
      
          let original = targettask;
      
          // Return a new Promise for the second Firestore API call
          return new Promise((resolve, reject) => {
            refoftask
              .update(updated)
              .then(() => resolve(updated))
              .catch(() => resolve(original));
          });
        })
        .then(updatedData => {
          // Process the updated data in the last .then() callback
          console.log('Updated Data:', updatedData);

          ///try to dispatch actionshere
          dispatch({
            type:USERS_DONE_TASKS,
            postId:taskid,//a single target taskid
            posts:[updatedData]
            });
        });
    })
}


//task action generator ends
export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}
export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
            })
    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
                for(let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(following[i], true));
                }
            })
    })
}

export function fetchUsersData(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                    else {
                        console.log('does not exist')
                    }
                })
                if(getPosts){
                    dispatch(fetchUsersFollowingPosts(uid));
                }
        }
    })
}


export function fetchUsersFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                const uid = snapshot.query._delegate._query.path.segments[1];
                const user = getState().usersState.users.find(el => el.uid === uid);


                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })
                for(let i = 0; i < posts.length; i++){
                    dispatch(fetchUsersFollowingLikes(uid,posts[i].id))
                }
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
               // console.log(getState());

            })
    })
}

export function fetchUsersFollowingLikes(uid, postId) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                const postId = snapshot._delegate.ref._key.path.segments[3];
           
                let currentUserLike = false;
                if(snapshot.exists){
                    currentUserLike = true;
                }
                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
    })
}
