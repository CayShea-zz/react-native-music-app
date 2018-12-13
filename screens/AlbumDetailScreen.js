import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking, Alert } from 'react-native';
import { Avatar, Icon, Divider, List, ListItem } from 'react-native-elements';

import * as actions from '../actions';

export default class AlbumDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'AlbumDetail',
  };

  constructor (){
    super();

    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    const album =this.props.navigation.getParam('album', {});
    
    actions.allTracks(album.id).then( 
        tracks => {
            this.setState({ tracks });
        }).catch( 
            error => console.error(error))
  }

  async saveTrackToFavorites(album, track) {
    //first retrieve 'favoriteAlbums' from storage
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums') || {};

    let albumData = favoriteAlbums[album.id]

    //check if we have albumData in storage. if not yet, then set it
    if (!albumData){
        albumData = album;
    }
    //check if all tracks for album are saved. if not, create an empty object
    if (!albumData['tracks']){
        albumData['tracks'] = {};
    }

    //set the track and album
    albumData['tracks'][track.id] = track;
    favoriteAlbums[album.id] = albumData;

    //save favoriteAlbums to storage
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums)

    if (success){
            //display message that album saved
            Alert.alert(
              'Track Added!',
              `${track.title} is added to your Favorites`,
              [
                {text: 'Continue', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false })
  }
}

  renderTracks(album){
      const {tracks} = this.state;

      if(tracks && tracks.length > 0){
          return tracks.map((track, index) => {
              return (
                  <ListItem key={index} 
                            title={track.title}
                            leftIcon={{name: 'play-arrow'}}
                            leftIconOnPress={() => Linking.openURL(track.preview)}
                            rightIcon={
                                <Icon raised
                                    name='star'
                                    type='font-awesome'
                                    onPress={() => {this.saveTrackToFavorites(album, track)}} />}
                  />
                )
          })
      }
    }

  render() {
    const album =this.props.navigation.getParam('album', {});
    const artist =this.props.navigation.getParam('artist', '');


    if (album.id) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}> 
                    <View style={styles.avatar}>
                        <Avatar xlarge rounded source={{uri:album.cover_medium}}></Avatar>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.mainText}>{album.title}</Text>
                        <Text style={styles.subText}>{artist}</Text>
                        <Icon 
                            raised
                            name='play'
                            type='font-awesome'                     
                            onPress={() => Linking.openURL(this.state.tracks[0].preview)}/>
                    </View>
                </View>
                <Divider style={{backgroundColor:'black'}}/>
                <List>
                    { this.renderTracks(album) }
                </List>
            </ScrollView>
        )
    } else {
        return (
            <View><Text>Loading...</Text></View>
        )
    }
   }
}
    
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 20
  },
  avatar: {
      flex: 1,
      marginRight: 20
  },
  headerRight: {
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      flexDirection: 'column'
  },
  mainText: {
      fontWeight: 'bold',
      color: '#3e3e3e',
      fontSize: 17
  },
  subText: {
      color: '#3e3e3e',
      fontSize: 17
  }
});
