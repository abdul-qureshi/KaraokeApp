import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  Image,
  ListView,
  PropTypes,
  Navigator,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

export class NowPlaying extends Component {
  constructor(props){
    super(props);
    this.state = {
      paused: false,
      muted: false,
      currentTime: 0,
    };
  }
  togglePlay(){
    this.setState({paused: !this.state.paused})
  }
  setTime(params){
    this.setState({ currentTime: params.currentTime });
  }
  onLoad(params){
    this.setState({ songDuration: params.duration });
  }

  render() {
  let uri = this.props.data.uri == '' ? 'https://facebook.github.io/react/img/logo_og.png' : this.props.data.uri;
  let songPercentage;
    if( this.state.songDuration !== undefined ){
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    };
    return (
      <View style={{flex: 1, marginTop: 16}}>
        <NowPlayingHeader style={{flex: 2}}
                          title={this.props.data.title}
                          artist={this.props.data.artist}
                          uri={this.props.data.uri} 
                          songPercentage = {songPercentage}
                          currentTime = {this.state.currentTime}
                          duration={this.state.songDuration } />
        <Image style={{flex: 8}} source={{uri: uri}} />
        <NowPlayingFooter style={{flex: 3}} duration={this.props.data.duration} playpause = {this.togglePlay.bind(this)} ppstate = {this.state.paused}/>
        <Video
          source={require('./music/justin-bieber-what-do-you-mean-instrumental.mp3')}
          repeat={false}
          onEnd={() => { AlertIOS.alert('Done!') }}
          paused={this.state.paused}
          muted={this.state.muted}
          onProgress={ this.setTime.bind(this) }
          onLoad={ this.onLoad.bind(this) }
        />  
     </View>  
    );
  }
}

class NowPlayingHeader extends Component {
  render() {
    let uri = this.props.uri == '' ? 'https://facebook.github.io/react/img/logo_og.png' : this.props.uri;
    return (
      <View style = {{flex: 2, flexDirection: 'column'}}>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center'}}>
          
          <Image
            style={{width: 36, height: 36, margin: 12}} 
            source={{uri: uri}} 
          />
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>  
            <Text style={{fontSize: 18}}>{this.props.title}</Text>
            <Text style={{fontSize: 12}}>{this.props.artist}</Text>
          </View>
        </View>
        <View style={ styles.sliderContainer }>
          <Slider
            disabled = {true}
            minimumTrackTintColor='#851c44'
            style={ styles.slider }
            trackStyle={ styles.sliderTrack }
            thumbStyle={ styles.sliderThumb }
            value={ this.props.songPercentage }/>         
        </View>
        <View style={ styles.timeInfo }>
          <Text style={ styles.time }>{ formattedTime(this.props.currentTime)  }</Text>
          <Text style={ styles.timeRight }> {formattedTime( this.props.duration ) }</Text>
        </View>
      </View>
    );    
  }
}

class NowPlayingFooter extends Component {
  render() {
    var icon = this.props.ppstate == true ? require('./images/ios/ic_play_circle_filled_3x.png') : require('./images/ios/ic_pause_circle_filled_3x.png');
    return (
      <View style={{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={this.props.playpause}>
          <Image style={{width: 60, height: 60}}
                 source={icon} />
        </TouchableOpacity>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
    sliderContainer: {
    flex: 1,
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
    flex: 1,
    margin: 15,
  },
  time: {
    color: 'black',
    justifyContent: 'flex-start',
    textAlign: 'left',
    flex: 1,
    fontSize: 12,
  },
  timeRight: {
    color: 'black',
    textAlign: 'right',
    justifyContent: 'flex-end',
    flex: 1,
    fontSize: 12,
  },
  slider: {
    height: 1,
    margin: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 2,
    height: 2,
    backgroundColor: '#f62976',
    borderRadius: 1,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

//TODO: Move this to a Utils file
function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) ){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}