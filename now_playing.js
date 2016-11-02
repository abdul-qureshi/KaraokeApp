import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

export class NowPlaying extends Component {
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