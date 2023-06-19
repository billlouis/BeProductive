import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Button, TouchableOpacity} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { doneTask } from '../../redux/actions'

import 'firebase/compat/firestore';
function yourself(props) {
    const [tasklist, setPosts] = useState([]);

    useEffect(() => {
            props.tasklist.sort(function (x, y) {
                return x.date - y.date;
            })
            console.log(props.tasklist);
            setPosts(props.tasklist);
            console.log("update");
    }, [props.tasklist]);


    //on done press
       const onDonePress = (postId,doneval) => {
            console.log("hello");
            console.log(postId)
            props.dispatch(doneTask(postId,doneval));







        }

    //this is try to add the likes
    // const onSomething = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("users")
    //         .doc(userId)
    //         .collection("task")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .set({})
    // }




    // const onLikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .set({})
    // }

    // const onDislikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .delete()
    // }
    
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList  
                    numColumns={1}
                    horizontal={false}
                    data={tasklist}
                    renderItem={({ item }) => {
                        console.log(item,"render addtask");
                        return (
                        <View
                            style={styles.containerImage}>
                            <View ><Text style={styles.container}>{item.title}</Text></View>
                            <View ><Text style={styles.container}>{item.notes}</Text></View>
                            <View ><Text style={styles.container}>{'asdf'}</Text></View>

                            <Button 
                                        title ="Done"
                                        onPress={() => onDonePress(item.id,!item.done)}
                                        
                                    />

                            {/* the next two part maybe the pop up and focusing */}
                            {/* <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            /> */}

                            {/* { item.currentUserLike ? 
                                (
                                    <Button 
                                        title ="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)}
                                    />
                                )
                                :
                                (
                                    <Button 
                                        title ="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)}
                                    />
                                )
                            } */}
                            {/* <Text
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                            </Text> */}
                        </View>

                    )}}

                />
            </View>
            <TouchableOpacity onPress= {()=>props.navigation.navigate("Task")}>
                <MaterialCommunityIcons name = "plus" style = {styles.add} color="white" size ={60}/>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({

    flat:{
        flexDirection:'column',
        alignItems:'center',
    },


    container: {
        flex: 1,
        backgroundColor: '#3ba000',
        
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        justifyContent:'space-around',
         borderWidth:1,
         padding:10,

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    add: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        backgroundColor: '#3be2b0',
        borderRadius: 100,
  
    },
})
const mapStateToProps = (store) => ({
    tasklist: store.tasksState.tasklist,
})
export default connect(mapStateToProps)(yourself);