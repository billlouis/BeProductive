import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View, Button, Image, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
export default function Add({navigation}){
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.Back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  useEffect(() => {
    (async ()=> {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');

    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === null){
    return <View/>;
  }
  if(hasCameraPermission === false){
    //return <Text>No access</Text>
  }

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      setImage(data.uri); 
      // console.log(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled){
      setImage(result.uri);
    }
  };
  return (
    <View>
      <View style = {styles.layout}>

        <Camera 
            ref = {ref => setCamera(ref)}
            style = {styles.fixedRatio}
            type = {type}
            ratio = {'1:1'}
        />

        <View style = {styles.buttons}>

          <View style={{flex:1}}>
            <TouchableOpacity onPress= {() => { setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);}}>
                <MaterialCommunityIcons name = "camera-flip-outline" color="white" size ={40} style={styles.flipimage}/>
            </TouchableOpacity>
          </View>

          <View style={{flex:1}}>
            <TouchableOpacity onPress= {() => takePicture()}>
                <MaterialCommunityIcons name = "camera" color="#FFFFFFC0" size ={60} style={styles.takepicture}/>
            </TouchableOpacity>
          </View>

          <View style={{flex:1}}>
            <TouchableOpacity onPress= {() => pickImage()}>
                <MaterialCommunityIcons name = "image" color="white" size ={40} style={styles.pickimage}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.save}><Button title = "Save Profile" color="#3BE2B0" onPress = {() => navigation.navigate('SaveProfile',{image})}/></View>
      </View>
      
      {image && <Image source = {{uri:image}} style = {styles.afterpicture}/>}
    </View>
  )
  // return (
  //   <View style = {{flex : 1}}>
  //     <View style = {styles.cameraContainer}>
  //       <Camera 
  //         ref = {ref => setCamera(ref)}
  //         style = {styles.fixedRatio}
  //         type = {type}
  //         ratio = {'1:1'}
  //       />
  //     </View>
  //     <Button
  //       title = "Flip Image"
  //       onPress = {() => {
  //         setType(
  //           type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
  //         );
  //       }}>

  //     </Button>
  //     <Button title = "Take Picture" onPress={()=> takePicture()}/>
  //     <Button title = "Pick Image" onPress={()=> pickImage()}/>
  //     <Button title = "SaveProfile" onPress = {() => navigation.navigate('SaveProfile',{image})}/>
  //     {image && <Image source = {{uri:image}} style = {{flex: 1}}/>}
  //   </View>
  // )

}

const styles = StyleSheet.create({
  layout:{
    flexDirection: 'column',
  },
  fixedRatio:{
    flex:10,
    aspectRatio:0.75,
    marginTop:20,
    paddingBottom:450,
    alignSelf:"center",
  },
  afterpicture:{
    height:150,
    width:120,
    left:235,
    bottom:375,
    borderRadius:10,
    borderColor:"white",
    borderWidth:1,
  },
  buttons:{
    flex:1,
    flexDirection: 'row',
    margin:0,
    marginTop:30
  },
  flipimage:{
    backgroundColor:"#3BE2B0", 
    borderRadius:100, 
    width:60, 
    height:60,
    alignSelf:"center",
    padding:10,
    borderColor:"white",
    borderWidth: 1,
    shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
  },
  takepicture:{
    backgroundColor:"#3BE2B0", 
    borderRadius:100, 
    width:100, 
    height:100,
    alignSelf:"center",
    padding:20,
    borderColor:"white",
    borderWidth: 1,
    shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
  },
  pickimage:{
    backgroundColor:"#3BE2B0", 
    borderRadius:100, 
    width:60, 
    height:60,
    alignSelf:"center",
    padding:10,
    borderColor:"white",
    borderWidth: 1,
    shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
  },
  save:{
    marginTop: 150,
    paddingLeft:40,
    marginleft:40,
    marginRight:40
  }
})