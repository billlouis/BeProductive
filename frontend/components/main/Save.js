import React, {useState} from 'react'
import {View, TextInput, Image,Button} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { NavigationContainer } from '@react-navigation/native'
import moment from "moment";


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
               // console.log(snapshot)
            })
        }

        const taskError = snapshot => {
           // console.log(snapshot)
        }

        task.on("state_changed",taskProgress,  taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            likesCount : 0
        })
        firebase.firestore()
                            .collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .get()
                            .then((snapshot) => {
                              
                                //get the current
                                let userobj={...snapshot.data()};
                                var currentDate = moment().format("DD/MM/YYYY");
                                if(userobj.lastFeed==null){
                                    firebase.firestore()
                                    .collection('users')
                                    .doc(firebase.auth().currentUser.uid).update({lastFeed:currentDate});
                                    firebase.firestore()
                                    .collection('users')
                                    .doc(firebase.auth().currentUser.uid).update({streak:1});
                                    firebase.firestore()
                                    .collection('users')
                                    .doc(firebase.auth().currentUser.uid).update({todayPhoto:downloadURL});
                                }
                                else{
                                    if(userobj.lastFeed != currentDate){
                                        firebase.firestore()
                                        .collection('users')
                                        .doc(firebase.auth().currentUser.uid).update({lastFeed:currentDate});
                    
                                        firebase.firestore()
                                        .collection('users')
                                        .doc(firebase.auth().currentUser.uid).update({todayPhoto:downloadURL});
                    
                                        const streaknum = userobj.streak + 1
                    
                                        firebase.firestore()
                                        .collection('users')
                                        .doc(firebase.auth().currentUser.uid).update({streak:streaknum});
                    
                                    }
                                    else{
                                        firebase.firestore()
                                        .collection('users')
                                        .doc(firebase.auth().currentUser.uid).update({todayPhoto:downloadURL});
                                    }}})
                props.navigation.popToTop()
    }

    return (
        <View style={{flex:1}}>
            <Image source = {{uri: props.route.params.image}}/>
            <TextInput
                placeholder='Write your caption...'
                onChangeText={(caption)=> setCaption(caption)}
            />
            <Button title = "Upload" onPress={()=>{
                            
                uploadImage()}}/>
        </View>
    )
}
