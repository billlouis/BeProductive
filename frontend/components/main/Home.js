import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressabl, SafeAreaView} from 'react-native'

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

const EmptyScreen = () =>{
    return(null)
}

const TopTab = createMaterialTopTabNavigator();

const Flex = ({navigation}) => {
    return (
        <View>
            <SafeAreaView style={styles.container}></SafeAreaView>
            <View style={{flexDirection: 'row', height: 600, justifyContent:'space-around'}}>
                <View style = {{flex: 0.2}}></View>
                <View style={[{flex: 1}, {flexDirection: 'column', height: "auto"}]}>
                    <View style={{flex: 1, backgroundColor: 'grey', borderTopLeftRadius: 150, borderTopRightRadius: 150}} />
                    <View style={{flex: 18, backgroundColor: 'grey'}} />
                    <View style={{flex: 2, backgroundColor: 'grey', borderBottomLeftRadius: 150, borderBottomRightRadius: 150, alignItems: "center"}}>
                        <TouchableOpacity onPress= {()=>navigation.navigate()}>
                            <MaterialCommunityIcons name = "arrow-right" color="white" size ={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{flex: 0.2}}></View>
                <View style={{flex: 6}}>
                
                    <TopTab.Navigator initialLayout="Yourself" screenOptions={{tabBarLabelStyle: {fontSize: 12}, tabBarStyle:{marginRight:150, backgroundColor:"transparent", borderRadius:100}}}>
                        <TopTab.Screen name="Yourself" component={YourselfScreen} options={{ tabBarLabel: 'Yourself'}}/>
                        <TopTab.Screen name="Feeds" component={FeedScreen} options={{ tabBarLabel: 'Feeds' }}/>
                    </TopTab.Navigator>
                    
                </View>
            </View>
            <View style = {{marginRight:340}}>
                <TouchableOpacity component = {ProfileScreen} onPress= {()=>navigation.navigate("Chat")}
                    style = {{borderRadius: 100, backgroundColor:'red', width:50, height:50, alignSelf: 'center'}}>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
      backgroundColor: 'aliceblue',
    },
    box: {
      width: 50,
      height: 50,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: 'oldlace',
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      minWidth: '48%',
      textAlign: 'center',
    },
    selected: {
      backgroundColor: 'coral',
      borderWidth: 0,
    },
    buttonLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: 'coral',
    },
    selectedLabel: {
      color: 'white',
    },
    label: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 24,
    },
    
  });
export default Flex;