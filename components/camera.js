'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import axios from 'axios';
import Modal from 'react-native-simple-modal';
import Spinner from 'react-native-loading-spinner-overlay';

var firebase = require("firebase");

const cloudVisionKey = 'AIzaSyBafJpjLR_HnSRTmkxTjrI8U7-_JYMvX9E';

// Endpoints
const cloudVision  = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

export default class CustomCamera extends Component {

  constructor(props) {
   super(props);
   this.state = {
     showLoader: false,
     type: RNCamera.Constants.Type.back,
     showModal:false,
     visiondesc:''
   };

   this.toggleLoader = this.toggleLoader.bind(this);

 }

 dumpToFirebase(content, locale){
 

  // Get a database reference to our posts
  var ref = firebase.database().ref("/classes/bio/feedback");

  var postData = {
    content,
    locale
  }

  var newPostKey = ref.push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/' + newPostKey] = postData;

  ref.update(updates);

 }

 toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader
    })
  }

  takePicture() {
   let self = this;
   //this.toggleLoader();
   //alert('hi');
   const options = { quality: 0.5, base64: true };
   this.camera.takePictureAsync(options)
     .then((image64) => {
       fetch(cloudVision, {
      method: 'POST',
      body: JSON.stringify({
  "requests": [
    {
      "image": {
        "content": image64.base64
      },
      "features": [
        {
          "type": "DOCUMENT_TEXT_DETECTION"
        }
      ]
    }
  ]
}
     ),
     headers: new Headers({ 'Content-Type': 'application/json' })
     })
     .then( response => response.json() )
     .then(response => {
       
       let textAnnotations = (response.responses[0].textAnnotations[0]);
       const textContent      = textAnnotations.description;
       const detectedLanguage = textAnnotations.locale;
       
       this.setState({visiondesc: textContent, showModal:true});
       console.log(textContent);
       console.log(this.state.showModal)

       this.dumpToFirebase(textContent, detectedLanguage);


     })
     .catch(function (error) {
       console.log(error, "error");
     });
     })
     .catch(err => console.error(err));
 }

 componentDidMount(){
  var config = {
    apiKey: "AIzaSyA1R-xevUEGntkwxQE4uxJXdW7ZJy9V8VE",
    authDomain: "cbb-app.firebaseapp.com",
    databaseURL: "https://cbb-app.firebaseio.com",
    projectId: "cbb-app",
    storageBucket: "cbb-app.appspot.com",
    messagingSenderId: "174759734530"
  };
  firebase.initializeApp(config);
 }


  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.showLoader}/>

        <Modal
          open={this.state.showModal}
          >

        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}

            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        >
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
         //////////////// flip button

          

          <TouchableHighlight 
          onPress={() => {
            this.state.showModal = false;

          }}><Text>Exit</Text>
          </TouchableHighlight>

          <Text>{this.state.visiondesc}</Text>
          </Modal>

          <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === RNCamera.Constants.Type.back
                      ? RNCamera.Constants.Type.front
                      : RNCamera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
         ///////////////////////////
          <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../img/bg.jpg')}
             />
          </TouchableHighlight>
        </View>
      </RNCamera>
      </View>
    );
  }




  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     CameraRoll.saveToCameraRoll(data)
  //       .then(Alert.alert('Success', 'Photo added to camera roll!'))
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
