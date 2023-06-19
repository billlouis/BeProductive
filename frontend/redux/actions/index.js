import firebase from 'firebase/compat/app'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE,USERS_DATA_STATE_CHANGE ,USERS_POSTS_STATE_CHANGE, CLEAR_DATA, USERS_LIKES_STATE_CHANGE} from '../constants/index'
import { Constants } from 'react-native-unimodules';
import * as Notifications from 'expo-notifications';
export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}
export function reload() {
    return ((dispatch) => {
        dispatch(clearData())
        dispatch(fetchUser())
        dispatch(setNotificationService())
        dispatch(fetchUserPosts())
        dispatch(fetchUserFollowing())

    })
}
export const setNotificationService = () => async dispatch => {
    let token;
    if (Constants.isDevice) {
        const existingStatus = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus.status !== 'granted') {
            const status = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus.status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync());
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    if (token != undefined) {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                notificationToken: token.data,
            })
    }

}

export const sendNotification = (to, title, body, data) => dispatch => {
    if (to == null) {
        return;
    }

    let response = fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to,
            sound: 'default',
            title,
            body,
            data
        })
    })
    console.log(response)

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
