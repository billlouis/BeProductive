import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Button} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import 'firebase/compat/firestore';
function Profile(props) {
  const [userPost, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)
  useEffect(()=> {
    const {currentUser, posts} = props;
    //console.log({currentUser,posts})
    if(props.route.params.uid === firebase.auth().currentUser.uid){
      setUser(currentUser)
      setUserPosts(posts)
    }
    else{
      firebase.firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                setUser(snapshot.data());
            }
            else{
                console.log('Does not exits')
            }
        })
      firebase.firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy("creation","asc")
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            })
            //console.log(posts)
            setUserPosts(posts)
        })
      
    }
    if(props.following.indexOf(props.route.params.uid)>-1){
      setFollowing(true);

    }
    else{
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following])

  const onFollow = () => {
    //console.log("followed")
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
  }
  const onUnfollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()
  }

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if(user === null){
    return <View/>
  }
  return (
    <View style = {styles.container}>
      <View style = {styles.containerInfo}>
        <Text> {user.name} </Text>
        <Text> {user.email} </Text>

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title="Following"
                                onPress={() => onUnfollow()}
                            />
                        ) :
                            (
                                <Button
                                    title="Follow"
                                    onPress={() => onFollow()}
                                />
                            )}
                    </View>
                ) : 
                
                <View>
                    <Button
                        title="Logout"
                        onPress={() => onLogout()}
                    />
                </View>}
      </View>
      <View style = {styles.containerGallery}>
        <FlatList 
        numColumns={3}
        horizontal={false}
        data = {userPost}
        renderItem={({item}) => (
          <View style ={styles.containerImage}>
            <Image style = {styles.image} source ={{uri: item.downloadURL}}/>
          </View>
        )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container : {
    flex:1,
    marginTop:40
  },
  containerInfo:{
    margin: 20
  },
  containerGallery:{
    flex:1
  },
  image:{
    flex:1,
    aspectRatio: 1/1
  },
  containerImage:{
    flex: 1/3,
    aspectRatio: 1/1
  }

})
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)