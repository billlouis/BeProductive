import React , { useState }from 'react'
import { Button, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data}
            });
            setUsers(users);
        })
        
    }
    return(
        <View>
            <TextInput style={styles.searchbar} placeholder='Type Here...' onChangeText={(search)=>fetchUsers(search)}/>

            <FlatList
                numColumns={1}  
                horizontal = {false}
                data={users}
                renderItem={({item})=>(
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate("Profile",{uid: item.id})}>
                         <Text>{item.name}</Text>
                    </TouchableOpacity>
                   
                )}
            />

            <Button onPress={() => props.navigation.navigate("Chat")} title="Chat"></Button>
        </View>
    )
}

const styles=StyleSheet.create({
    searchbar:{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
    }
})
