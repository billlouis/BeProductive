import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Pressable, TouchableOpacity, TouchableHighlight} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ProfileScreen from './Profile'

import 'firebase/compat/firestore';
function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded === props.following.length && props.following.length !== 0) {

            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })

            setPosts(props.feed);
        }
        //console.log(posts)
    }, [props.usersFollowingLoaded,props.feed])
    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
        console.log(posts)
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    const checkProfile=()=>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
        if (snapshot.exists) {
            if(snapshot.data().downloadURL!=null){
            setImage(snapshot.data().downloadURL)
        }}})
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.containerGallery}>
                <FlatList
                    
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    ListFooterComponent={posts.length > 0 ? <View style={{height:175}}/> : null}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <View style={styles.usericon}>
                                <TouchableOpacity component = {ProfileScreen} onPress= {()=>{checkProfile();props.navigation.navigate("Profile",{uid: item.id})}}
                                    style = {styles.accountIcon}>
                                    <Image style={{flex:1, aspectRatio: 1/1, borderRadius:50}}source={{uri: item.user.downloadURL}}/>
                                </TouchableOpacity>
                                <Text style={[styles.container, {flex:1}]}>{item.user.name}</Text>
                                <Text style={[styles.datetext, {flex:1, alignSelf:"flex-end"}]}>{new Date(item.creation.seconds*1000).toLocaleString()}</Text>
                            </View>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <Text style={styles.desctext}><MaterialCommunityIcons name = "send" color="lightgrey" size ={13}/> {item.caption}</Text>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                                
                                <View style = {{flex:4}}>
                                    <Text style = {styles.comment}
                                    onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                    View Comments...
                                    </Text><MaterialCommunityIcons name = "send-circle-outline" color="lightgrey" size ={20} style={{bottom:39, left:190}}/>
                                </View>

                                <View style = {{flex:1}}>
                                    { item.currentUserLike ? 
                                        (
                                            <TouchableHighlight 
                                                style = {styles.like_button}
                                                onPress={() => onDislikePress(item.user.uid, item.id)}
                                            ><MaterialCommunityIcons name = "party-popper" color="white" size ={30}/></TouchableHighlight>
                                        )
                                        :
                                        (
                                            <TouchableHighlight 
                                                style = {styles.like_button}
                                                onPress={() => onLikePress(item.user.uid, item.id)}
                                            ><MaterialCommunityIcons name = "party-popper" color="#ad0505" size ={30}/></TouchableHighlight>
                                        )
                                    }
                                </View>
                            </View>
                            
                            
                            
                        </View>
                        
                        
                    )}

                />
            </View>

            <TouchableOpacity onPress= {()=>props.navigation.navigate("Add")}>
                <MaterialCommunityIcons name = "camera" style = {styles.add} color="white" size ={40}/>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:5,
        paddingLeft:10,
        fontSize:20,
        marginBottom:5, 
    },
    datetext:{
        fontSize: 13,
        marginLeft: 75,
        marginBottom: 5
    },
    usericon:{
        flexDirection: "row",
    },
    containerInfo: {
        margin: 20,
        padding : 15
    },
    containerGallery: {
        flex: 1,
    },
    desctext: {
        flex: 1,
        paddingBottom:5,
        paddingLeft:15,
        fontSize:17,
        marginBottom:5, 
    },
    containerImage: {
        flex: 1 / 3,
        borderRadius: 20,
        shadowColor: 'black',
        shadowRadius: 100,
        shadowOpacity: 100,
        elevation: 6,
        backgroundColor: '#FAFAFA',
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black', borderWidth: 1,
        padding : 5,
        marginBottom: 10,
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 20,
        borderColor: "#ababab",
        borderWidth: 1,
        margin: 2,
        marginLeft: 6, //idk why it's like this
        
    },
    add: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: '#3be2b0',
        borderRadius: 100,
        padding: 8,
        paddingLeft: 10,
        borderColor:"white",
        borderWidth:1,
    },
    like_button:{
        borderRadius: 100,
        backgroundColor:'#3AE8B3',
        width: 40, height: 40,
        alignSelf: 'flex-end',
        paddingLeft: 5, margin: 10,
    },
    comment:{
        color: "grey",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
    },
    accountIcon:{
        borderRadius: 100, 
        backgroundColor:'red', 
        width:30, height:30, 
        alignSelf: 'center', 
        marginLeft: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "lightgrey",
        shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 1
    },
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);