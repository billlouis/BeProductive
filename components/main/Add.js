import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View, Button, Image} from 'react-native'
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
      console.log(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled){
      setImage(result.uri);
    }
  };

  return (
    <View style = {{flex : 1}}>
      <View style = {styles.cameraContainer}>
        <Camera 
          ref = {ref => setCamera(ref)}
          style = {styles.fixedRatio}
          type = {type}
          ratio = {'1:1'}
        />
      </View>
      <Button
        title = "Flip Image"
        onPress = {() => {
          setType(
            type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
          );
        }}>

      </Button>
      <Button title = "Take Picture" onPress={()=> takePicture()}/>
      <Button title = "Pick Image" onPress={()=> pickImage()}/>
      <Button title = "Save" onPress = {() => navigation.navigate('Save',{image})}/>
      {image && <Image source = {{uri:image}} style = {{flex: 1}}/>}
    </View>
  )

}

const styles = StyleSheet.create({
  cameraContainer:{
    flex:1,
    flexDirection: 'row'
  },
  fixedRatio:{
    flex:1,
    aspectRatio:1
  }
})