import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';

import CardList from '../components/CardList';
import * as actions from '../actions';
import SearchText from '../components/SearchText';

export default class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title: 'Albums',
  };

  constructor (){
    super();

    this.state = {
      albums: [],
      isLoading: false,
      artist: ''
    }

    this.searchAlbums = this.searchAlbums.bind(this);
    this.renderButtonNav = this.renderButtonNav.bind(this);
  }

  searchAlbums(artist){
    this.setState({isLoading: true, albums: [], artist});

    actions.searchTracks(artist)
      .then(albums => {
        this.setState({ albums, isLoading: false }) 
      }).catch(err => this.setState({albums: [], isLoading: false}));
  }

  renderButtonNav(album){
    const {artist} = this.state;
    return(
        <View style={styles.albumMenu}>
          <Icon
            name='play'
            color='#00aced'
            onPress={() => {}}
            type='font-awesome'
            raised
          />
          <Icon
            name='info'
            color='#00aced'
            onPress={() => {this.props.navigation.navigate('AlbumDetail', {album, artist})}}
            type='font-awesome'
            raised
          />
          <Icon
            name='thumbs-up'
            color='#00aced'
            onPress={() => {this.saveAlbumToFavorites(album)}}
            type='font-awesome'
            raised
          />
        </View>
    )
  }

  renderAlbumView(){
    const { albums, isLoading } = this.state;

    return (
      <ScrollView style={styles.container}>
        <SearchText
            searchArtists={this.searchAlbums}
        ></SearchText>
        {
          albums.length > 0 && !isLoading &&
              <CardList 
                  data={albums}
                  buttonView={this.renderButtonNav}
                  >
              </CardList>
        }
        {
          isLoading && 
              <View>
                <Text>
                  Loading up some awesome...
                </Text>
              </View>
        }
      </ScrollView>
    );
  }

  async saveAlbumToFavorites(album){
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums') || {};

    if (favoriteAlbums[album.id]){
      //display message that album already saved
      Alert.alert(
        'Already saved to Favorites',
        'You must love this one! Have no fear, it is already saved to your Favorites',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false } )
      return false;
    }

    favoriteAlbums[album.id] = album;

    const success = actions.storeData('favoriteAlbums', favoriteAlbums)

    if (success){
      Alert.alert(
        'Album Added!',
        `${album.title} is added to your Favorites!`,
        [
          {text: 'Continue', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false })
    }
  }


  render() {
   return this.renderAlbumView();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  albumMenu: {
    flexDirection:'row',
    justifyContent: 'space-between',

  }
});