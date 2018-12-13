import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class Screen1Screen extends React.Component {
  static navigationOptions = {
    title: 'Screen1',
  };

  constructor() {
    super();

    this.state= {
        title: "I am screen1"
    }
    console.log('constructor');
  }

  componentDidMount(){
      this.setState({
          title: "I am updated Screen1"
      })
    console.log('did mount');
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentDidUpdate() {
    console.log('did update');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button 
            title={'Navigate to screen links'}
            onPress={() => {this.props.navigation.navigate('Links')}}
        />
        <Button 
            title={'Go Back'}
            onPress={() => {this.props.navigation.pop()}}
        />
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
});
