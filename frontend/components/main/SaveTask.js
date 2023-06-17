import React, {useState} from 'react'
import {View, TextInput, Image,Button} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { NavigationContainer } from '@react-navigation/native'



export default function SaveTodo(props) {
    const [caption, setCaption] = useState("")//init state as ""

    const uploadImage= async ()=> {
        const uri = props.route.params.image;
        const response = await fetch(uri);
        const blob = await response.blob();
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const task = firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob);
        
        //snapshot log to show that it is transfering
        //might not be working correctly but it's ok just to show that it is sending
        const taskProgress = snapshot => {
            console.log(`Transferred: ${snapshot.byteTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed",taskProgress,  taskError, taskCompleted);
    }

    //done modify for the todolist
    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('todos')
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        })) 
    }

    //first modify//need more attention
    return (
        <View style={{flex:1}}>
            <Image source = {{uri: props.route.params.image}}/>
            <TextInput
                placeholder='Write your caption...'
                onChangeText={(caption)=> setCaption(caption)}
                value= {caption}
            />
            <Button title = "Upload" onPress={()=>uploadImage()}/>
        </View>
    )
}
