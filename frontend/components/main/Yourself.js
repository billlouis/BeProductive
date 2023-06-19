import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Button, TouchableOpacity} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { doneTask } from '../../redux/actions'

import 'firebase/compat/firestore';
function yourself(props) {
    const [tasklist, setPosts] = useState([]);

    useEffect(() => {
            props.tasklist.sort(function (x, y) {
                return x.date - y.date;
            })
            console.log(props.tasklist);
            setPosts(props.tasklist);
            console.log("update");
    }, [props.tasklist]);


    //on done press
       const onDonePress = (postId,doneval) => {
            console.log("hello");
            console.log(postId)
            props.dispatch(doneTask(postId,doneval));
        }

    
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList  
                    numColumns={1}
                    horizontal={false}
                    data={tasklist}
                    renderItem={({ item }) => {
                        console.log(item,"render addtask");
                        return (
                            <View style={styles.containerImage}>
                                <View style={{flex:3, flexDirection:"column"}}>
                                    <View style={{flex:1, flexDirection:"row", backgroundColor:"red", alignItems:"flex-end"}}>
                                        <Text style={[styles.title, {flex:1, justifyContent:"flex-start"}]}>{item.title}</Text>
                                        <Text style={[styles.cate, {flex:1, justifyContent:"flex-end"}]}>{item.category}</Text>
                                    </View>
                                    <View style={[{flex:2} , styles.desc]}><Text style={styles.container}>{item.notes}</Text></View>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.container}>{item.date.toLocaleString()}</Text>
                                    <Button title ="Done" onPress={() => onDonePress(item.id,!item.done)}/>
                                </View>
                            </View>
                        )}}

                />
            </View>
            <TouchableOpacity onPress= {()=>props.navigation.navigate("Addtask")}>
                <MaterialCommunityIcons name = "plus" style = {styles.add} color="white" size ={50}/>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({

    flat:{
        flexDirection:'column',
        alignItems:'center',
    },
    title:{
        fontSize:20,
        marginLeft:10,
        marginTop:5,
        backgroundColor:"blue"
    },
    cate:{
        fontSize:8,
        marginLeft:10,
    },
    desc:{
        fontSize:8,
        paddingTop:10,
        paddingRight:10,
        justifyContent:"flex-start"
    },
    date:{

    },
    doneIcon:{

    },
    deleteIcon:{

    },
    containerImage: {
        flex: 1 / 3,
        justifyContent:'space-around',
        flexDirection: "row",       
        borderWidth:1,
        borderRadius:20,
        borderColor: "grey",
        padding:10,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding:10
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    add: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: '#3be2b0',
        borderRadius: 100,
        padding: 2,
        paddingLeft:5,
        borderColor:"white",
        borderWidth:1,
    },
})
const mapStateToProps = (store) => ({
    tasklist: store.tasksState.tasklist,
})
export default connect(mapStateToProps)(yourself);