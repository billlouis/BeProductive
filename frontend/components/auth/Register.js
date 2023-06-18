import React, { Component } from 'react'
import {Text, View, Button, TextInput, StyleSheet, Pressable} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            name :'',
            verification: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp(){
        const{email,password,name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <View>
                <Text style={styles.title}>Sign-up form</Text>
                <TextInput 
                    style = {styles.textentry}
                    placeholder='Enter your full name' 
                    onChangeText={(name)=>this.setState({name})}
                />
                <TextInput 
                    style = {styles.textentry}
                    placeholder='Enter your email' 
                    onChangeText={(email)=>this.setState({email})}
                />
                <TextInput 
                    style = {styles.textentry}
                    placeholder='Enter your password'
                    secureTextEntry = {true} 
                    onChangeText={(password)=>this.setState({password})}
                />

                <TextInput 
                    style = {styles.textentry}
                    placeholder='Re-enter your password'
                    secureTextEntry = {true} 
                    onChangeText={(verification)=>this.setState({verification})}
                />
                {this.state.password == this.state.verification && this.state.verification != '' ? 
                <Pressable style={styles.allow_signup} onPress={() => this.onSignUp()}><Text style={{fontSize:30}}>Sign up</Text></Pressable> : 
                <Pressable style={styles.block_signup}><Text style={{fontSize:30}}>Sign up</Text></Pressable>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        padding: 10,
        marginVertical: 100,
        backgroundColor: 'gray',
        fontSize: 40,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'black',
    },
    textentry:{
        height: 50,
        backgroundColor: 'gray',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 40,
        borderRadius: 20,
        marginBottom:30,
        padding: 15,
        width: 400,
      },
    block_signup:{
        height:70,
        marginHorizontal:30,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'gray',
        width: 400,
    },
    allow_signup:{
        height:70,
        marginHorizontal:30,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#1CD69D',
        width: 400,
    }

})