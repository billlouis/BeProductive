import React ,{useState, useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView,View, Button, Image,KeyboardAvoidingView,ScrollView,TextInput,TouchableOpacity,Alert} from 'react-native';



export default function Add_task({navigation}){
  //dummy
  const TaskInit={
    title:null
  }

  //task state
  const [Task,SetTask] = useState(TaskInit);



  //handlers
  const handletitlechange= (t)=>{
    SetTask(
      {
        ...Task,
        title:t,
      }
    )
  }

  const handleaddtask = ()=>{


  }




  return(
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? "padding":"height"}
          style={styles.AddTaskWrapper}
        >
          <ScrollView>

          <Text style={styles.title}>Task Title</Text>
          <TextInput style={styles.titleinput} placeholder={'Title'} value={Task.title} onChangeText={text => handletitlechange(text)}></TextInput>

          <Text style={styles.title}>Notes</Text>
          <TextInput
            style={styles.titleinput}
            // value={define a new state}
            placeholder={'Add some notes here...'}
            multiline={true}
            numberOfLines={4}
          />
          </ScrollView>

          {/* placed outside of scroll view to fix the position */}
          <TouchableOpacity onPress={()=>handleaddtask()}> 
            <View style={styles.continuebutton}>
              <Text style={styles.continuetext}>{"Continue >>>"}</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
  );
}

const styles=StyleSheet.create({



  //mine
  container:{
    flex:1
  },

  AddTaskWrapper:{
    flex:1,

  },

  title:{

  },

  titleinput:{
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f3f7ff',
    textAlign: 'left',
    fontSize: 20,
  },

  // the continue button
  continuebutton:{
    marginTop: 40,
    paddingVertical: 20,
    backgroundColor: "#187C04",
  },

  continuetext:{
    color:"white",
    textAlign: 'center',
    fontSize: 20,
  }



})

