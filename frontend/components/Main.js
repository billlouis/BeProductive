import React, { Component, } from 'react'
import {View,Text, Dimensions} from 'react-native'
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
                        marginBottom: 40,
                        borderRadius: 50, 
                        marginLeft: (Dimensions.get('window').width / 2) - 115,
                        borderColor: "white", borderWidth: 2, borderTopWidth:3,
                        shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
                    },  
                     tabBarIcon: ({focused, color, size}) => {
                        let iconName, rn = route.name;

                        if(rn === "Home"){
                            iconName = focused 
                            ? "home"
                            : "home-outline"
                        }
                        else if(rn === "Notification"){
                            iconName = focused 
                            ? "bell"
                            : "bell-outline"
                        }
                        else if(rn === "Agenda"){
                            iconName = focused 
                            ? "calendar"
                            : "calendar-outline"
                        }
                        return <MaterialCommunityIcons style = {{borderRadius: 100, backgroundColor: color, padding:8}} name = {iconName} color={'white'} size ={30}/>
                     },
                     tabBarOptions:{
                        style:{
                            backgroundColor: 'transparent',
                        },
                        
                     },
                    tabBarActiveTintColor: '#0F7D5C',
                    tabBarInactiveTintColor: '',
                
                })}
                
            >
                <Tab.Screen name="Home" component={HomeScreen} navigation={this.props.navigation} options = {{headerShown :false}}/>
                <Tab.Screen name="Notification" component={NotifScreen}
                    listeners={({navigation}) => ({tabPress: event=>{
                            event.preventDefault();
                            navigation.navigate("Notification")
                        }
                    })}
                    options = {{headerShown :false}}
                />
                <Tab.Screen name="Agenda" component={Calendarr} />
                <Tab.Screen name="Agenda" component={AgendaScreen} />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData},dispatch)

export default connect(mapStateToProps, mapDispatchProps)(main);