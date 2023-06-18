import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom'
import {View,Text} from 'react-native'
import Icon from '@mdi/react'
import { mdiHomeOutline, mdiSetCenter, mdiSolid } from '@mdi/js';
import { mdiBellOutline } from '@mdi/js';
import { mdiCalendarBlankOutline } from '@mdi/js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser , fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index'
import firebase from 'firebase/compat/app'
import SearchScreen from './main/Search'
import HomeScreen from './main/Home'
import ProfileScreen from './main/Profile'
import NotifScreen from './main/Notification_tab'
import Calendarr from './main/Agenda_tab'
import ChatScreen from './main/Chat'
import AddTaskScreen from './main/Addtask';
import CommentScreen from './main/Comments';
import { shadow } from 'react-native-paper';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';



const Tab = createBottomTabNavigator();
const EmptyScreen = () =>{
    return(null)
}
export class main extends Component {
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {
        //const Drawer = createDrawerNavigator();
        return (
            <Tab.Navigator 
                initialRouteName="Home" 
                labeled = {false} 
                screenOptions={({route}) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#3BE2B0", 
                        width: 230, height: 70,
                        position: 'absolute',
                        marginHorizontal:86, //make the navbar centered
                        marginBottom: 20,
                        borderRadius: 50, borderColor: "white", borderWidth: 2,
                        shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
                    },  
                     tabBarIcon: () => {
                        let iconName, rn = route.name;

                        if(rn === "Home") iconName = "home-outline";
                        else if(rn === "Notification") iconName = "bell-outline";
                        else if(rn === "Agenda") iconName = "calendar-outline";
                        return <MaterialCommunityIcons name = {iconName} color="white" size ={30}/>
                     },
                     tabBarOptions:{
                        style:{
                            backgroundColor: 'transparent',
                        },
                        tabBarActiveTintColor: 'yellow',
                        tabBarInactiveTintColor: 'white',
                     }
                
                })}
                
            >
                <Tab.Screen name="Home" component={HomeScreen} navigation={this.props.navigation} options = {{headerShown :false}}/>
                <Tab.Screen name="Notification" component={NotifScreen}
                    listeners={({navigation}) => ({tabPress: event=>{
                            event.preventDefault();
                            navigation.navigate("Notification")
                        }
                    })}
                    
                />
                <Tab.Screen name="Agenda" component={Calendarr} />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData},dispatch)

export default connect(mapStateToProps, mapDispatchProps)(main);