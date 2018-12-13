import React from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Button, Card, List, Text, ListItem, Icon, TouchableHighlight, } from 'react-native-elements';

import * as actions from '../actions';
import _ from 'lodash';

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  constructor(){
    super();

    this.state = {
      favoriteAlbums: undefined
    }

    this.getFavoriteAlbums();
  }

  async getFavoriteAlbums(){
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums');
 
    if (favoriteAlbums){
      this.setState({favoriteAlbums});
    }
  }

  async deleteAlbum(id){
    const {favoriteAlbums} = this.state;

    delete favoriteAlbums[id];
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums);
    if (success){
      this.setState(favoriteAlbums)
    }
  }

  renderFavoriteTracks(track) {
    if (track){
      return _.map(track, (trac, id) => {
        return(
            <ListItem 
                key={id}
                title={trac.title}
                leftIcon={{ name: 'play-arrow'}}
                rightIcon={
                  <Icon 
                  raised
                  name='music'
                  type='font-awesome'
                  color='#f50'
                  onPress={() => Linking.openURL(trac.preview)}/>
                }
            />
      )})
    }
  }
  renderFavoriteAlbums(){
    const { favoriteAlbums } = this.state;

    if(favoriteAlbums) {
      return _.map(favoriteAlbums, (album, id) => {
        return (
          <View>
             <Card title={album.title}
                   key={id}>
             <TouchableHighlight
                  style={styles.button}
                  onPress={this.deleteAlbum(album.id)}>
                  <Text> Delete Album </Text>
            </TouchableHighlight>
                {/* <Button
                    title='Delete Album'
                    raised
                    backgroundColor='#f50'
                    name='trash'
                    onPress={() => {this.deleteAlbum(album.id)}}/> */}
            { this.renderFavoriteTracks(album.tracks) }
            </Card>
          </View>
          )
    })} else {
      return (
        <View>
          <Text>Oh my! You have no favorites saved yet!</Text>
        </View>
      )
    }
  }  

  render() {
    return(
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
               {this.renderFavoriteAlbums()}
        </List>
      </ScrollView>
    )
}}



const styles= StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  listContainer: {
    backgroundColor: '#eaeaea'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
})