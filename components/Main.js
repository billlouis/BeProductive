import React, { Component } from 'react'
import {View,Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed'

import ProfileScreen from './main/Profile'

<<<<<<< HEAD
const Tab = createMaterialBottomTabNavigator();
=======
const Tab = createBottomTabNavigator();
>>>>>>> ec4715501fa83e67b79ef9e49b84ea2820028314
const EmptyScreen = () =>{
    return(null)
}
export class main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
<<<<<<< HEAD
            <Tab.Navigator initialRouteName='Feed' labeled = {false}>
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name = "home" color={color} size ={26}/>
                    )
                }}/>
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({navigation})=> ({
                        tabPress: event=>{
=======
            <Tab.Navigator 
                initialRouteName="Feed" 
                labeled = {false} 
                screenOptions={({route}) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#3BE2B0", 
                        width: 230, 
                        height: 70,
                        alignSelf: "center",
                        marginBottom: 50,
                        borderRadius: 50,
                        borderColor: "white",
                        borderWidth: 2,
                        shadowColor: "black",
                        shadowRadius: 10,
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.6
                    },  
                    tabBarIcon: () => {
                        let iconName, rn = route.name;

                        if(rn === "Feed") iconName = mdiHomeOutline;
                        else if(rn === "Notification") iconName = mdiBellOutline;
                        else if(rn === "Agenda") iconName = mdiCalendarBlankOutline;

                        return <Icon path = {iconName} color="white" size ={1.3}/>
                    },
                })}
                
            >

                <Tab.Screen name="Feed" component={FeedScreen}/>
                <Tab.Screen name="Notification" component={NotifScreen}
                    listeners={({navigation}) => ({tabPress: event=>{
>>>>>>> ec4715501fa83e67b79ef9e49b84ea2820028314
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
<<<<<<< HEAD
                    options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name = "camera" color={color} size ={26}/>
                    )
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name = "account" color={color} size ={26}/>
                    )
                }}/>
=======
                />
                <Tab.Screen name="Agenda" component={AgendaScreen}/>

>>>>>>> ec4715501fa83e67b79ef9e49b84ea2820028314
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser},dispatch)

export default connect(mapStateToProps, mapDispatchProps)(main);