import React, {Component} from 'react';
import { Text, Image, View, StyleSheet, ImageBackground} from 'react-native';
import {Avatar, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons'
import {human, material, iOSColors, iOSUIKit} from 'react-native-typography';
// import Barcode from 'react-native-barcode-builder'; // Version can be specified in package.json

//import {Container, Header, Content, Button, Text} from 'native-base';

//icon={<Icon name="facebook" size={15} color='#b30000' /> } iconRight
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardnumber: '000772037'
    }
  }


  render() {

    return (

      <View style={styles.container}>
          <View style = {styles.container_one}>
             <View style={styles.white_box}> <Text style = {iOSUIKit.largeTitleEmphasized}> B </Text> </View>
              <View style={styles.red_box}> </View>
               <View style={styles.white_box}> <Text style = {iOSUIKit.largeTitleEmphasized}> A </Text> </View>
                <View style={styles.red_box}>  </View>
                <View style={styles.white_box}> <Text style = {iOSUIKit.largeTitleEmphasized}> T </Text> </View>
                <View style={styles.red_box}> </View>
                <View style={styles.white_box}> <Text style = {iOSUIKit.largeTitleEmphasized}> E </Text> </View>
                <View style={styles.red_box}> </View>
                <View style={styles.white_box}> <Text style = {iOSUIKit.largeTitleEmphasized}> S </Text> </View>
          </View>



           <View style = {styles.green_row} >
                     <Button  title = 'ATHLETICS'/>
                    <Text> 10 Degrees Farenheit </Text>
                    </View>

                <View style = {styles.silver_row} >
                 <Button   title = 'COMMONS'/>
                <Text> Saturday, March 24th </Text>
                </View>

        <View style = {styles.blue_row} >
                     <Button  title = 'EVENTS'/>
                    <Text> Some important event </Text>
                    </View>


                <Card title = {this.state.cardnumber} >
            <Avatar
            small
            rounded
            source={require('../../img/paw.jpg')}
            onPress={() => alert('cool')}
            activeOpacity={0.7}
          />
                </Card>


        </View>







      // <Card
      //       title={this.state.cardnumber}
      //       image={require('../img/paw.jpg')}>

      // <View style = {{flex: 1, flexDirection: 'row'}}>
      //   <View style={styles.red_box}>
      //     <Button bordered dark>
      //         <Text> Food </Text>
      //     </Button>
      //   </View>


      // </View>



      )

  }


}


const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
  container_one: { flexDirection: 'row', justifyContent: 'space-evenly'},
  red_box: { width: 34, height: 50, backgroundColor: '#b30000' },
  white_box: { width: 34, height: 50, backgroundColor: 'rgb(300,0,0)' },
  redder_box: { width: 50, height: 50, backgroundColor: '#b30001' },
  green_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //width: 70,
      height: 25,
      alignItems: 'stretch',
      backgroundColor: 'green'
  },
  blue_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //width: 70,
      height: 25,
      alignItems: 'stretch',
      backgroundColor: 'powderblue'
  },
  silver_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //width: 70,
      height: 25,
      alignItems: 'stretch',
      backgroundColor: 'white'
  },

})
