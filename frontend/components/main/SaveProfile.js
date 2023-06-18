import React, {useState} from 'react'
import {View, TextInput, Image,Button} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { NavigationContainer } from '@react-navigation/native'



export default function Save(props) {
    const [caption, setCaption] = useState("")

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

    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
            downloadURL,
        }).then((function () {
            props.navigation.navigate("Profile",{uid: firebase.auth().currentUser.uid})
        })) 
    }

    uploadImage();
}
