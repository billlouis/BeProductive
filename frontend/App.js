import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import {View,Text} from 'react-native'

import firebase from 'firebase/compat/app'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer,applyMiddleware(thunk)) 
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBgIdKCHItQcB9cJIzXGIRux38UEfA5OQs",
      authDomain: "beproductive-23b15.firebaseapp.com",
      projectId: "beproductive-23b15",
      storageBucket: "beproductive-23b15.appspot.com",
      messagingSenderId: "1084287725554",
      appId: "1:1084287725554:web:4c3c21ae35a0544babc56b",
      measurementId: "G-B3DM5K98KH"
    };

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comments';





const Stack = createStackNavigator();


export class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      loaded : false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => { 
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  
  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View style ={{flex : 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown:false}}/>
            <Stack.Screen name = "Register" component = {RegisterScreen} />
            <Stack.Screen name = "Login" component = {LoginScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store ={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {MainScreen} options = {{headerShown:false}}/>
            <Stack.Screen name = "Add" component={AddScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Save" component={SaveScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Comment" component={CommentScreen} navigation = {this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
export default App