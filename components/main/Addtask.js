import React ,{useState, useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView,View, Button, Image,KeyboardAvoidingView,ScrollView,TextInput,TouchableOpacity,Alert} from 'react-native';

//added for date picker
import DateTimePicker from '@react-native-community/datetimepicker';
import { Directions } from 'react-native-gesture-handler';

export default function Add_task({navigation}){
  //title state
  const [title,setTitle] = useState();
  const [notes,setNotes] = useState();
  const [category,setCategory] = useState();
  //pick datetime state
  const [date, setDate] = useState(new Date(1687238030000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  //event handlers
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handletitlechange= (t)=>{
    setTitle(t);
  }

  const handlenoteschange= (n)=>{
    setNotes(n);
  }

  const handlecategorychange= (c)=>{
    setCategory(c);
  }


  ///not yet done
  const handleaddtask = ()=>{


  }




  return(
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? "padding":"height"}
          style={styles.AddTaskWrapper}
        >
          <ScrollView>

          <Text style={styles.title}>Task Title</Text>
          <TextInput style={styles.titleinput} placeholder={'Title'} value={title} onChangeText={text => handletitlechange(text)}></TextInput>

          <Text style={styles.title}>Notes</Text>
          <TextInput
            style={styles.titleinput}
            value={notes}
            placeholder={'Add some notes here...'}
            multiline={true}
            numberOfLines={4}
          />

          <Text>Due</Text>
          <View style={styles.datepicker}>
            <Button onPress={showDatepicker} title={date.toLocaleString().split(", ")[0]} />
            <Button onPress={showTimepicker} title={date.toLocaleString().split(", ")[1]} />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </View>

          <Text>Category</Text>
          <View style={styles.category}>
          <TextInput  placeholder={'Choose...'} value={category} onChangeText={text => handlecategorychange(text)}></TextInput>
          </View>



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



  
  container:{
    flex:1
  },
  //title
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
  },


  //date picker
  datepicker:{
    flexDirection:'row',
    justifyContent:'center',
  },

  category:{
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f3f7ff',
    textAlign: 'left',
    fontSize: 20,
  },


})

