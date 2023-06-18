import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions, SafeAreaView, StatusBar} from 'react-native'

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
import {Friendlist} from './Friendlist'
import { Button } from 'react-native-paper';
//import AddTaskScreen from './main/Addtask';
import firebase from 'firebase/compat/app'

const EmptyScreen = () =>{
    return(null)
}

const TopTab = createMaterialTopTabNavigator();

const popuplist = [
    {
        id:1,
        name: "Task"
    },
    {
        id:2,
        name: "Message"
    },
    {
        id:3,
        name: "Note"
    }
]

const Flex = ({navigation}) => {

    let popref = React.createRef()

    const onShowPopup = () => {
        popref.show()
    }

    const onClosePopup = () => {
        popref.close()
    }

    return (
        <SafeAreaView style = {styles.testContainer}>
            <View style={styles.toptab_flexbox}>
                <View style = {styles.spaces}/>
                <View style={styles.sidebar}>
                    <View style = {styles.sidebar_top}>
                        <TouchableOpacity component = {ProfileScreen} onPress= {()=>navigation.navigate("Profile",{uid: firebase.auth().currentUser.uid})}
                            style = {styles.accountIcon}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sidebar_middle}>
                        <View style = {styles.sidebar_innermiddle}>
                            <View style={{flex: 10}}/>
                            <View style={styles.addIcon}>
                                <TouchableOpacity onPress= {()=>navigation.navigate("Search")}>
                                    <MaterialCommunityIcons name = "account-multiple-plus-outline" color="white" size ={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sidebar_bottom}>
                        <TouchableOpacity onPress= {onShowPopup}>
                            <MaterialCommunityIcons name = "arrow-right" color="white" size ={30}/>
                        </TouchableOpacity>
                        <Friendlist
                            title="Demo Popup"
                            ref={(target) => popref = target}
                            onTouchOutside={onClosePopup}
                            data={popuplist}
                        />
                    </View>
                </View>
                <View style = {styles.spaces}/>
                <View style={{flex: 6}}>
                    <TopTab.Navigator initialLayout="Yourself" screenOptions={{tabBarLabelStyle: {fontSize: 12, textAlign:"left"}, tabBarIndicatorStyle: {backgroundColor: '#1CD69D'}}}>
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
      marginBottom: 40,
      backgroundColor: '#9C9C9C',
      borderRadius:100,
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
        borderTopLeftRadius: 150, 
        borderTopRightRadius: 150, 
    },
    sidebar_middle:{
        flex: 15, 
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
        borderBottomLeftRadius: 150, 
        borderBottomRightRadius: 150, 
        alignItems: "center", 
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