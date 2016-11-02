import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  PropTypes,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { NowPlaying } from './now_playing.js'
import { SongList } from './song_list.js'

var songList = [
  {'title': 'Treat You Better', 'artist': 'Shawn Mendes', 'duration': '3:07', 'uri': ''},
  {'title': 'Needed Me', 'artist': 'Rihanna', 'duration': '3:11', 'uri': ''},
  {'title': 'Let Me Love You', 'artist': 'DJ Snake (feat. Justin Bieber)', 'duration': '3:25', 'uri': ''},
  {'title': 'Let It Go', 'artist': 'James Bay', 'duration': '4:20', 'uri': ''},
  {'title': 'We Don\'t Talk Anymore', 'artist': 'Charlie Puth (feat. Selena Gomez)', 'duration': '3:37', 'uri': ''}
]  

class KaraokeApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ data: songList, index: 0}}
        renderScene={(route, navigator) => this.renderScene_(route, navigator)}
      />
    );
  }
  renderScene_(route, navigator) {
    if (route.index == 0) {
      return (<SongList
        data={route.data}
        onForward={ (songData) => {
          navigator.push({
            data: songData,
            index: route.index + 1,
          });
        }}/>);
    } else if (route.index == 1) {
      return(<NowPlaying data={route.data} />);
    }
  }  
}

AppRegistry.registerComponent('KaraokeApp', () => KaraokeApp);
