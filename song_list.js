import React, { Component } from 'react';
import {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export class SongList extends Component {
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