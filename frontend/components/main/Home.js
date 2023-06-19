import React, { Component, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions, SafeAreaView, StatusBar,Image} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
//import { fetchUser , fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index'
//import firebase from 'firebase/compat/app'
import SearchScreen from './Search'
import FeedScreen from './Feed'
import ProfileScreen from './Profile'
import YourselfScreen from './Yourself'
import ChatScreen from './Chat'
import FriendDrawer from './Friendlist'
import { Button } from 'react-native-paper';
//import AddTaskScreen from './main/Addtask';
import firebase from 'firebase/compat/app'

const EmptyScreen = () =>{
    return(null)
}

const TopTab = createMaterialTopTabNavigator();

const Flex = ({navigation}) => {
    return (
      <SafeAreaView style = {styles.testContainer}>
        <View style={{flexDirection: 'row', height: Dimensions.get("window").height, justifyContent:'space-around'}}>
            <View style={[{flex: 1}, styles.container, {flexDirection: 'column', borderRadius:100}]}>
                <View style={{flex: 1, backgroundColor: 'grey', borderTopLeftRadius: 150, borderTopRightRadius: 150}} />
                <View style = {{flex:2, backgroundColor: 'grey'}}>
                  <TouchableOpacity component = {ProfileScreen} onPress= {()=>navigation.navigate("Profile",{uid: firebase.auth().currentUser.uid})}
                  style = {{borderRadius: 100, backgroundColor:'red', width:50, height:50, alignSelf: 'center'}}>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 18, backgroundColor: 'grey'}} />
                <View style={{flex: 2, backgroundColor: 'grey', borderBottomLeftRadius: 150, borderBottomRightRadius: 150, alignItems: "center"}}>
                    <TouchableOpacity onPress= {()=>navigation.navigate()}>
                        <MaterialCommunityIcons name = "arrow-right" color="white" size ={30}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flex: 0.2}}></View>
            <View style={{flex: 6}}>
              
                <TopTab.Navigator initialLayout="Yourself" screenOptions={{tabBarLabelStyle: {fontSize: 12, textAlign:"left"}}}>
                    <TopTab.Screen name="Yourself" component={YourselfScreen} options={{ tabBarLabel: 'Yourself' }}/>
                    <TopTab.Screen name="Feeds" component={FeedScreen} options={{ tabBarLabel: 'Feeds' }}/>
                </TopTab.Navigator>
                
            </View>
          </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sidebar: {
      flex: 1,
      marginTop: 30,
      backgroundColor: 'white',
      flexDirection: 'column', 
      borderRadius:100
    },
    testContainer:{
      flex: 1,
        marginTop:StatusBar.currentHeight
    },
    toptab_flexbox:{
        flexDirection: 'row', 
        height: Dimensions.get("window").height, 
        justifyContent:'space-around'
    },
    spaces:{
        flex: 0.2
    },
    sidebar_top:{
        flex:1.3, 
        backgroundColor: 'grey', 
        borderTopLeftRadius: 150, 
        borderTopRightRadius: 150, 
        borderColor:"grey"
    },
    sidebar_middle:{
        flex: 15, 
        backgroundColor: 'grey',
    },
    sidebar_innermiddle:{
        flex:1, 
        borderRadius: 100, 
        backgroundColor: "lightgrey", 
        marginLeft:5, 
        marginRight:5, 
        marginTop:10, 
        marginBottom:10,
        alignItems:"center",
        flexDirection: "column"
    },
    sidebar_bottom:{
        flex: 1, 
        backgroundColor: 'grey', 
        borderBottomLeftRadius: 150, 
        borderBottomRightRadius: 150, 
        alignItems: "center", 
        borderColor:"grey"
    },
    accountIcon:{
        borderRadius: 100, 
        backgroundColor:'red', 
        width:40, height:40, 
        alignSelf: 'center', 
        marginTop:10
    },
    addIcon:{
        backgroundColor:"#3BE2B0", 
        borderRadius:100, 
        width:35, 
        alignSelf:"center",
        padding:7,
        flex:0.35,
        marginBottom:10,
        borderColor:"white",
        borderWidth: 1
    }
    
  });
export default Flex;