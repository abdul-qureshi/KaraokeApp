/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  PropTypes,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var songList = [
  {'title': 'Treat You Better', 'artist': 'Shawn Mendes', 'duration': '3:07', 'uri': ''},
  {'title': 'Needed Me', 'artist': 'Rihanna', 'duration': '3:11', 'uri': ''},
  {'title': 'Let Me Love You', 'artist': 'DJ Snake (feat. Justin Bieber)', 'duration': '3:25', 'uri': ''},
  {'title': 'Let It Go', 'artist': 'James Bay', 'duration': '4:20', 'uri': ''},
  {'title': 'We Don\'t Talk Anymore', 'artist': 'Charlie Puth (feat. Selena Gomez)', 'duration': '3:37', 'uri': ''}
]

class NowPlaying extends Component {
  render() {
  let uri = this.props.data.uri == '' ? 'https://facebook.github.io/react/img/logo_og.png' : this.props.data.uri;
    return (
      <View style={{flex: 1, marginTop: 16}}>
        <NowPlayingHeader style={{flex: 1}}
                          title={this.props.data.title}
                          artist={this.props.data.artist}
                          uri={this.props.data.uri} />
        <Image style={{flex: 8}} source={{uri: uri}} />
        <NowPlayingFooter style={{flex: 1}} duration={this.props.data.duration} />
     </View>   
    );
  }  
}

class NowPlayingHeader extends Component {
  render() {
    let uri = this.props.uri == '' ? 'https://facebook.github.io/react/img/logo_og.png' : this.props.uri;
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1}}>
        <Image
          style={{width: 36, height: 36, margin: 12}} 
          source={{uri: uri}} 
        />
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>  
          <Text style={{fontSize: 18}}>{this.props.title}</Text>
          <Text style={{fontSize: 12}}>{this.props.artist}</Text>
        </View>
      </View>
    );    
  }
}

class NowPlayingFooter extends Component {
  render() {
    return (
      <View style={{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image style={{width: 48, height: 48}}
               source={require('./images/ios/ic_skip_previous_2x.png')} />
        <Image style={{width: 48, height: 48}}
               source={require('./images/ios/ic_play_circle_filled_2x.png')} />
        <Image style={{width: 48, height: 48}}
               source={require('./images/ios/ic_skip_next_2x.png')} />

      </View>
    );
  }
}


class SongRow extends Component {
  render() {
    let uri = this.props.uri == '' ? 'https://facebook.github.io/react/img/logo_og.png' : this.props.uri;
    return (
      <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1}}>
        <Image 
          style={{width: 36, height: 36, margin: 8}} 
          source={{uri: uri}} 
        />
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>  
          <Text style={{fontSize: 12}}>{this.props.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 8}}>{this.props.artist}</Text>
            <Text style={{fontSize: 8, marginLeft: 8}}>{this.props.duration}</Text>
          </View>
        </View>
      </View>
    );    
  }
}

class SongList extends Component {
  propTypes: {
    data: PropTypes.array.isRequired,
    onForward: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
    };
  }
  render() {
    return(
        <ListView dataSource={this.state.dataSource}
                  renderRow={
                    (rowData) => <TouchableHighlight onPress={() => this.props.onForward(rowData)}>
                                   <View>
                                    <SongRow title={rowData.title} 
                                          artist={rowData.artist} 
                                          duration={rowData.duration}
                                          uri={rowData.uri} />
                                  </View>
                                 </TouchableHighlight>
                  }
                  style={{marginTop: 12}}
        />
    );
  }
}  

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

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('KaraokeApp', () => KaraokeApp);
