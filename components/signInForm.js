import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import TextInputField from './subcomponents/textInputField.js';
import styles from '../styles/base_styles.js';

import GeoAttendance from './geoattendance.js';

import * as firebase from 'firebase';
//currently no barrier to logging in and signing up
class SignInForm extends Component {

    state = { email: '', uid: '', pass: '', error: '', loading: false, loggedIn: false };

    /////////
    ///////// Hello world for Login/Signup Email Authentication
    onSignInPress() {
        this.setState({ error: '', loading: true });
        const { email, pass } = this.state; //now that person has input text, their email and password are here
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => { this.setState({ error: '', loading: false });
                          this.authChangeListener();
                          //cant do these things:
                          //firebase.database().ref('Users/7j2AnQgioWTXP7vhiJzjwXPOdLC3/').set({name: 'Imad Rajwani', attended: 1});
                          }).catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(() => { this.setState({ error: '', loading: false });
                                  this.authChangeListener();  }
                                      )
                    .catch(() => {
                      // console.log( 'registration error', error )
                      // if (error.code === 'auth/email-already-in-use') {
                      //       var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                      //
                      //
                      // }

                      this.setState({ error: 'Authentication failed, booo hooo.', loading: false });
                    });
            });

    }
    ///////////
    ///////////


    authChangeListener() {

        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.setState({uid: user.uid, loggedIn: true});
                //alert(this.state.uid);
                return this.props.navigation.navigate('ga'); //abandon forced navigation. conditional render
            } else {
              alert('no user found');
            }


        } )


                  }



    renderButtonOrLoading() {
        if (this.state.loading) {
            return <View style={[styles.horizontal, styles.aicontainer]}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                   </View>
        }
        return <Button onPress={this.onSignInPress.bind(this)} title="Log in" />;
    }


    componentWillMount() {
      const config = {
         apiKey: "AIzaSyB2Ydsrp9LkWo26w_C5s_k_qAtJA40jnkM",
         authDomain: "bateslife-199822.firebaseapp.com",
         databaseURL: "https://bateslife-199822.firebaseio.com",
         projectId: "bateslife-199822",
         storageBucket: "bateslife-199822.appspot.com",
         messagingSenderId: "30236129686"
       };

      firebase.initializeApp(config);


    }

    render() {
      if (this.state.loggedIn) {
        return (

          <GeoAttendance userid={this.state.uid} />

        ); } else {
          return (
          <View>
                  <TextInputField
                      label='Email Address'
                      placeholder='youremailaddress@bates.edu'
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })}
                      autoCorrect={false}
                  />
                  <TextInputField
                      label='Password'
                      autoCorrect={false}
                      placeholder='Your Password'
                      secureTextEntry
                      value={this.state.pass}
                      onChangeText={pass => this.setState({ pass })}
                  />
                  <Text>{this.state.error}</Text>
                  {this.renderButtonOrLoading()}
          </View>
                  )




        }
    }
}
export default SignInForm;
