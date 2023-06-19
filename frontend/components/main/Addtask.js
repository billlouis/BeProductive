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
          <TextInput style={styles.titleinput} placeholder={'Title'} value={title} onChangeText={text => handletitlechange(text)}></TextInput>

          <Text style={styles.title}>Notes</Text>
          <TextInput
            style={styles.titleinput}
            value={notes}
            placeholder={'Add some notes here...'}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => handlenoteschange(text)}
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
          
          <View>
    <ButtonGroup
      buttons={categorySuggestion}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        ontapcategorybutton(value);
      }}
      containerStyle={{ marginBottom: 20 }}
    />

  </View>
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

const mapStateToProps = (store) => {
  return {
    tasklist: store.tasksState.tasklist,
  }
  
}
// const mapDispatchProps = (dispatch) => bindActionCreators({addTasks},dispatch)

// export default connect(mapStateToProps, mapDispatchProps)(Add_task);

export default connect(mapStateToProps)(Add_task);
