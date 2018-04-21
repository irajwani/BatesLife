// import React, {Component} from 'react';
// import {Button, View, Text} from 'react-native';
// import * as firebase from 'firebase'
//
// const config = {
//    apiKey: "AIzaSyB2Ydsrp9LkWo26w_C5s_k_qAtJA40jnkM",
//    authDomain: "bateslife-199822.firebaseapp.com",
//    databaseURL: "https://bateslife-199822.firebaseio.com",
//    projectId: "bateslife-199822",
//    storageBucket: "bateslife-199822.appspot.com",
//    messagingSenderId: "30236129686"
//  };
//
// firebase.initializeApp(config);
//
//
//  export default class FirebaseApp extends Component {
//    constructor(props){
//      super(props);
//      this.state = {
//        name: 'imad',
//        age: 21
//      }
//    }
//
//
//    storeHighScore(userId, score) {
//   firebase.database().ref('users/' + userId).set({
//     highscore: score
//   });
// }
//
// setupHighscoreListener(userId) {
// firebase.database().ref('users/' + userId).on('value', (snapshot) => {
//   const highscore = snapshot.val().highscore;
//   alert("New high score: " + highscore);
// });
// }
//
//    render() {
//
//
//
//
//      return (
//        <View>
//           <Button title = 'AADDDDDDD' onPress = { () => { firebase.database().ref('names/').set({name: this.state.name});  } } />
//
//        </View>
//
//
//      );
//    }
//  }
