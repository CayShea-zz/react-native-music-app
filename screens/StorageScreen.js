import React from 'react';
import { ScrollView, StyleSheet, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as action from '../actions';
import { Button, Divider, Text } from 'react-native-elements';

export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'Storage',
  };

  constructor(){
    super();

    this.state = {
      value: ''
    }
  }

  async storeData(){
    const data = {
          keyValue: "Ooh I am just some sexy data"
      }
     const value = await action.storeData('someRandomKey', data);
     return value;
    }

  async retrieveData(){
    this.setState({
      value: ''
    })
    const retrievedValue =  await action.retrieveData('favoriteAlbums');

    if (retrievedValue){
      console.log(retrievedValue)
      // this.setState({
      //   value: retrievedValue.keyValue
      // })
    }
  }

  async removeData(){
    const success = await action.clearStorage();
    
    if (success){
      this.setState({
        value: ''})
    }
  }

  render() {
    const {value} = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text> I am a storage Screen</Text>
        <Button 
            title="Store Datta"
            onPress={() => {this.storeData()}}
        />
        <Button 
            title="Retrieve Datta"
            onPress={() => {this.retrieveData()}}
        />
        <Button 
            title="Remove Datta"
            onPress={() => {this.removeData()}}
        />
        <Text> {value} </Text>

        <Divider style={{backgroundColor: 'black'}}/>
        <Text>Touchables</Text>

          <TouchableHighlight onPress={() => {}} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableHighlight</Text>
              </View>
          </TouchableHighlight>

          <TouchableOpacity onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableOpacity</Text>
              </View>
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
