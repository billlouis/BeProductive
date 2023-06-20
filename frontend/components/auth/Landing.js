import React, {Component, setState} from 'react'
import {Text, TextInput, View, Pressable, StyleSheet} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Landing_Login extends Component {
    constructor(props){
      super(props);
      this.state = {
          email : '',
          password : '',
          name :''
      }
      this.onLogIn = this.onLogIn.bind(this)
    }
    onLogIn(){
        const{email,password,name} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {console.log(result)})
            .catch((error)=>{console.log(error)})
    }
    render(){
    return (
        <View style ={{flex : 1, justifyContent: 'center'}}>

        <Text style={styles.greetings}>Welcome to BeProductive!</Text>
        <Text style={styles.started}>Let's Get Started</Text>

        <TextInput 
            style = {styles.textentry}
            placeholder='Enter email here' 
            onChangeText={email=> this.setState({email})}
        />
        <TextInput 
            style = {styles.textentry}
            placeholder='Enter your password'
            secureTextEntry = {true} 
            onChangeText={password=> this.setState({password})}
        />
        
        {/* changed to touchable opacity from pressable */}
        <TouchableOpacity style={styles.button} onPress={() => this.onLogIn()}>
          <Text style = {styles.text}>Login with credentials</Text>
        </TouchableOpacity>
        <Text style = {styles.signup}>Or sign up <Text style = 
        {{color: 'blue', fontWeight:'bold', textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate("Register")}>here</Text></Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  button: {
    height:70,
    marginHorizontal:30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#1CD69D',
  },
  text: {
    fontSize: 23,
    fontStyle: 'italic',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  greetings: {
    fontStyle: 'italic',
    fontSize: 40,
    textAlign: 'center',
    marginBottom:40,
  },
  started: {
    fontStyle: 'italic',
    fontSize: 40,
    textAlign: 'center',
    marginBottom:40,
  },
  signup:{
    fontSize: 20,
    marginTop: 20,
    textAlign:'center',
  },
  textentry:{
    height: 50,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 20,
    marginBottom:30,
    padding: 15,

  }

});
