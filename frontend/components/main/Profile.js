import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Button,ImageBackground,TouchableOpacity,ActivityIndicator} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import { container, text, utils } from '../styles';
import 'firebase/compat/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


function Profile(props) {
  const [userPost, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)
  const [background, setBackground] = useState("https://bit.ly/fcc-running-cats")
  const [image, setImage] = useState("https://bit.ly/fcc-running-cats")
  
  const [loading, setLoading] = useState(true)
    

  useEffect(()=> {
    const {currentUser, posts} = props;
    //console.log({currentUser,posts})
    if(props.route.params.uid === firebase.auth().currentUser.uid){
      setUser(currentUser)
      setUserPosts(posts)
      setLoading(false)
      firebase.firestore()
      .collection('users')
      .doc(props.route.params.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if(snapshot.data().downloadURL!=null){
            setImage(snapshot.data().downloadURL)
          }
          if(snapshot.data().backgroundURL!=null)
          {
            setBackground(snapshot.data().backgroundURL)
          }
          
      }
      setLoading(false)
      })
      }

    else{
      firebase.firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            props.navigation.setOptions({
                title: snapshot.data().username,
            })

            setUser({ uid: props.route.params.uid, ...snapshot.data() });
        }
        setLoading(false)
        })
      firebase.firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy("creation","desc")
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
    // firebase.firestore()
    // .collection('users')
    // .
  }, [props.route.params.uid, props.following, props.currentUser, props.posts])
  const onFollow = () => {
    //console.log("followed")
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("following")
    .doc(props.route.params.uid)
    .set({})

    firebase.firestore()
    .collection("users")
    .doc(props.route.params.uid)
    .collection("followers")
    .doc(firebase.auth().currentUser.uid)
    .set({})

    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})

    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("followers").doc(props.route.params.uid).get().then((snapshot) => {
      if(snapshot._delegate._document!==null){
        firebase.firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .collection("friends")
        .doc(firebase.auth().currentUser.uid)
        .set({})

        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("friends")
        .doc(props.route.params.uid)
        .set({})
      }
      else{
        console.log("nayy")
      }

    })
      //props.sendNotification(user.notificationToken, "New Follower", `${props.currentUser.name} Started following you`, { type: 'profile', user: firebase.auth().currentUser.uid })
  }
  
  const onUnfollow = () => {
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("following")
    .doc(props.route.params.uid)
    .delete()

    firebase.firestore()
    .collection("users")
    .doc(props.route.params.uid)
    .collection("followers")
    .doc(firebase.auth().currentUser.uid)
    .delete()

    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()

    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("friends")
    .doc(props.route.params.uid)
    .delete()
    
    firebase.firestore()
    .collection("users")
    .doc(props.route.params.uid)
    .collection("friends")
    .doc(firebase.auth().currentUser.uid)
    .delete()
  }

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (loading) {
    return (
        <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
            <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#00ff00" />
            <Text style={[text.notAvailable]}>Loading</Text>
        </View>
    )
  }
  if (user === null) {
    return (
        <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
            {/* <FontAwesome5 style={{ alignSelf: 'center', marginBottom: 20 }} name="dizzy" size={40} color="black" /> */}
            <Text style={[text.notAvailable]}>User Not Found</Text>
        </View>
    )
  }

  return (
    <View style = {styles.container}>
      
      <ImageBackground style={styles.backgroundImage}source={{uri: background}}>
        <TouchableOpacity onPress= {()=>props.navigation.navigate("Home")} style={{width: 40, paddingLeft:5, paddingTop: 5}}>
            <MaterialCommunityIcons name = "arrow-left" color="white" size ={30}/>
        </TouchableOpacity>
        { props.route.params.uid === firebase.auth().currentUser.uid &&
          <View style={{position:'absolute', alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress= {()=>onLogout()} style={{width: 40, paddingLeft:5, paddingTop: 5, alignSelf:'flex-end', bottom: 0}}>
            <MaterialCommunityIcons name = "logout" color="white" size ={30}/>
        </TouchableOpacity>
        </View>
        }
        {props.route.params.uid === firebase.auth().currentUser.uid &&
        <View style={{position:'absolute', alignSelf: 'flex-end',bottom: 0}}>
        <TouchableOpacity onPress= {()=>props.navigation.navigate("AddBackground")} style={{width: 40, paddingLeft:5, paddingTop: 5, alignSelf:'flex-end'}}>
            <MaterialCommunityIcons name = "pencil-box-outline" color="white" size ={30}/>
        </TouchableOpacity>
        </View>
        }
        <Image source={{uri: user.downloadURL==null?"https://bit.ly/fcc-running-cats":image}} style={{height: 150, width: 150, marginTop: 100, alignSelf: 'center', borderRadius: 150/2}}/>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View style={{alignSelf:'center'}}>
          <Text> {user.name}</Text> 
          </View>
        ):
        <TouchableOpacity onPress= {()=>props.navigation.navigate("AddProfile")} style={{alignSelf: 'center', height: 40}}>
        <Text> {user.name} <MaterialCommunityIcons name = "pencil" color="grey" size ={15}/></Text>
        </TouchableOpacity> }
        
      </ImageBackground>
      <View style = {styles.containerInfo}>

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
      {/* <View style = {[utils.borderTopGray]}>
        <FlatList 
        numColumns={3}
        horizontal={false}
        data = {userPost}
        renderItem={({item}) => (
          <View style ={styles.containerImage}>
            <Image style = {styles.imagetoday} source ={{uri: item.downloadURL}}/>
          </View>
        )}
        />
      </View> */}
      <Text style={{paddingLeft: 10}}>Today</Text>
      <View style = {[utils.borderTopGray]}>
        <FlatList 
        numColumns={3}
        horizontal={false}
        data = {userPost}
        renderItem={({item}) => (
          <View style ={styles.containerImage}>
            {/* {console.log(item.creation.toDate().toDateString().slice(0,15))}
            {console.log(Date().slice(0,15))} */}
            {item.creation.toDate().toDateString().slice(0,14)==Date().slice(0,14) && <Image style = {styles.imagetoday} source ={{uri: item.downloadURL}}/>}
          </View>
        )}
        />
      </View>
      <Text style={{paddingLeft: 10}}>Past few days</Text>
      <View style = {[utils.borderTopGray]}>
        <FlatList 
        numColumns={3}
        horizontal={false}
        data = {userPost}
        renderItem={({item}) => (
          <View style ={styles.containerImage}>
            {item.creation.toDate().toDateString().slice(0,14)!=Date().slice(0,14) && <Image style = {styles.image} source ={{uri: item.downloadURL}}/>}
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
    margin: 30
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
  },
  imagetoday:{
    flex:1,
    aspectRatio: 1/1
  },
  backgroundImage: {
    height: 250, 
    alignSelf:'stretch',
    position: 'relative'
  }

})
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)