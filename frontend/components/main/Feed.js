import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Pressable, TouchableOpacity, TouchableHighlight} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import 'firebase/compat/firestore';
function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {

            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            console.log(props);
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
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <Text style={styles.container}>PLACE THE DESCRIPTIOND</Text>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                                
                                <View style = {{flex:2}}><Text
                                style = {styles.comment}
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                </Text></View>

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
        padding:10,
        paddingLeft:20,
        fontSize:20,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        borderRadius: 20,
        shadowColor: 'black',
        shadowRadius: 100,
        shadowOpacity: 100,
        elevation: 5,
        backgroundColor: 'white',
        margin: 10,
        borderStyle: 'solid',
        borderColor: 'black', borderWidth: 1,

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 20,
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
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);