import React ,{useState, useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView,View, Button, Image,KeyboardAvoidingView,ScrollView,TextInput,TouchableOpacity,Alert} from 'react-native';
import {connect} from 'react-redux'
//added for date picker
import DateTimePicker from '@react-native-community/datetimepicker';
//added for suggestion group
import { ButtonGroup } from '@rneui/themed';
import { bindActionCreators } from 'redux'
//the actions to update the state
import { addTasks } from '../../redux/actions';
import { color } from '@rneui/themed/dist/config';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



function Add_task(props){
  //this is the default setting of the suggestion
  //the suggestion category for the user should be updated in the useEffect
  const [categorySuggestion,setCategorySuggestion] = useState(['Signals', 'Software\n studio', 'Linear']);

  useEffect(() => {
    //notes:
    //here we later try to do async loading of the most frequent category
    //try to refer to the add.js for the camera async call
    //the empty array at the second array means there is no dependency of calling the useeffect again 
    //ie no rerender because of state changes will result in the useeffect being call again
    //ie it is only called once at initial render
    
    //async update the users favourite category
    setCategorySuggestion(['Signals wowo', 'Software\n studio', 'Linear','cb']);

  },[]);



  //title state
  const [title,setTitle] = useState();
  const [notes,setNotes] = useState();
  const [category,setCategory] = useState();
  //pick datetime state
  const [date, setDate] = useState(new Date(1687238030000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  //pick category state //the state is the indexing of the button chosen
  const [selectedIndex, setSelectedIndex] = useState();


  //event handlers
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    // if (Platform.OS === 'android') {
    //   setShow(true);
    //   // for iOS, add a button that closes the picker
    // }
    setShow(true);
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

  const ontapcategorybutton= (index)=>{
    setSelectedIndex(index);
    setCategory(categorySuggestion[index]);
  }


  ///not yet done
  const handleaddtask = ()=>{
    //console.log(notes);

    //the firebase updating db action call is moved to the actions/index.js

    props.dispatch(addTasks(
      [{
        title:title,
        notes: notes,
        date:date,
        category: category,
        done:false,
      }]
      ));
            //then call then dispatch changes to pass the item to it 
            //by right we should do async in actions
            //for now we use a flag in the state to tell other people that there is a new item in there
            //so that they know when to reload
  }

  




  return(
        <KeyboardAvoidingView
          behavior="height"
          style={styles.AddTaskWrapper}
        >
          <ScrollView>

          <Text style={styles.title}>Task Title</Text>
          <TextInput style={styles.titleinput} 
            placeholder={'Title'} 
            placeholderTextColor={"#00000050"} 
            value={title} 
            onChangeText={text => handletitlechange(text)}>
          </TextInput>

          <Text style={styles.title}>Notes</Text>
          <TextInput
            style={styles.titleinput}
            value={notes}
            placeholder={'Add some notes here...'}
            placeholderTextColor={"#00000050"}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => handlenoteschange(text)}
          />

          <Text style={styles.title}>Due</Text>
          <View style={styles.datepicker}>
            <View style={[styles.pickerbutton, {flex:1}]}>
              <TouchableOpacity onPress={showDatepicker}> 
                <Text style={styles.pickertext}>{date.toLocaleString().split(", ")[0]}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.pickerbutton, {flex:1}]}>
              <TouchableOpacity onPress={showTimepicker}> 
                <Text style={styles.pickertext}>{date.toLocaleString().split(", ")[1]}</Text>
              </TouchableOpacity>
            </View>

              {/* <View><Button onPress={showDatepicker} color="#f3f7ff" title={date.toLocaleString().split(", ")[0]} /> </View>
              <View><Button onPress={showTimepicker} color="#50505050" title={date.toLocaleString().split(", ")[1]} /> </View> */}
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


          <Text style={styles.title}>Category</Text>
          <View style={styles.category}>
            <TextInput style={styles.categoryinput} placeholder={'Choose...'} value={category} onChangeText={text => handlecategorychange(text)} placeholderTextColor={"#00000050"}></TextInput>
            <View>
            <ButtonGroup
              buttons={categorySuggestion}
              selectedIndex={selectedIndex}
              onPress={(value) => {
                ontapcategorybutton(value);
              }}
              containerStyle={{ marginBottom: 10, backgroundColor:"#f3f7ff", borderColor:"transparent"}}
              buttonStyle={styles.categorybuttons}
              textStyle={styles.categorytext}
            />
          </View>
        </View>



        </ScrollView>

          {/* placed outside of scroll view to fix the position */}
          <TouchableOpacity onPress={()=>{            firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {

            //get the current
            let userobj={...snapshot.data()};

            let taskdonenum=userobj.numTask;

            console.log(taskdonenum);

            if(taskdonenum==null){
              taskdonenum = 0;
            }
            taskdonenum=taskdonenum+1;
            

            //update
            firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid).update({numTask:taskdonenum});
            //dispatch({ type: USERS_ADD_TASKS, posts });
        });handleaddtask()}}> 
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
    fontSize:25,
    color: "#000000AF",
    top:7,
    marginLeft:15,
    marginRight:10,
    paddingVertical: 10,
  },
  titleinput:{
    justifyContent:"center",
    marginLeft:20,
    marginRight:20,
    paddingVertical: 10,
    paddingLeft:13,
    paddingRight:13,
    backgroundColor: '#f3f7ff',
    textAlign: 'left',
    textAlignVertical: "top",
    fontSize: 20,
    borderRadius:20,
    borderColor:"#50505050",
    borderWidth:1
  },


  // the continue button
  continuebutton:{
    paddingVertical: 20,
    backgroundColor: "#3BE2B0",
  },
  continuetext:{
    color:"white",
    textAlign: 'center',
    fontSize: 20,
  },


  //date picker
  datepicker:{
    flexDirection:'row',
    alignContent:"space-between",
    marginLeft:10,
    marginRight:20,
  },
  pickerbutton:{
    marginLeft:10,
    marginright:10,
    paddingVertical: 10,
    backgroundColor: "#f3f7ff",
    borderRadius:20,
    borderColor:"#50505050",
    borderWidth:1
  },
  pickertext:{
    color:"#00000050",
    textAlign: 'center',
    fontSize: 30,
  },


  category:{
    width:"auto",
    top:5,
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    paddingVertical: 10,
    backgroundColor: "#f3f7ff",
    borderRadius:20,
    borderColor:"#50505050",
    borderWidth:1
  },
  categorybuttons:{
    paddingVertical: 10,
    padding:5,
    marginLeft:10,
    marginRight:10,
    backgroundColor: "white",
    borderRadius:20,
    borderColor:"#50505050",
    borderWidth:1
  },
  categorytext:{
    color:"#00000050",
    textAlign: 'center',
    fontSize: 12,
  },
  categoryinput:{
    justifyContent:"center",
    marginLeft:20,
    marginRight:20,
    paddingTop:10,
    paddingVertical: 0,
    paddingLeft:13,
    paddingRight:13,
    backgroundColor: 'white',
    textAlign: 'left',
    textAlignVertical: "top",
    fontSize: 15,
    borderRadius:20,
    borderColor:"#50505050",
    borderWidth:1
  },


})

const mapStateToProps = (store) => {
  return {
    tasklist: store.tasksState.tasklist,
  }
  
}
// const mapDispatchProps = (dispatch) => bindActionCreators({addTasks},dispatch)

// export default connect(mapStateToProps, mapDispatchProps)(Add_task);

export default connect(mapStateToProps)(Add_task);
