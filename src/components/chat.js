import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';
import {firebaseApp, topicsRef} from './auth/authentication';

class Topics extends Component{

  constructor(props){
    super(props)

    this.state = {
      displayName: '',
      text: '',
      uid: '',
      messages: []
    }
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount(){
    let user = firebaseApp.auth().currentUser;
    // Check if User doesn't have a display name and navigate to chooseName page
    if(!user.displayName){
      this.props.navigator.push({
        name: 'chooseName'
      })
    } else {
      // proceed normally with application
      this.setState({
        displayName: user.displayName,
        uid: user.uid
      })
      this.listenForItems(topicsRef);
    }
  }

  listenForItems(ref){
    ref.on('value', (snap) => {
      let messages = [];
      snap.child('messages').forEach(message => {
        messages.push(
          {
            _id: message.val()._id,
            text: message.val().text,
            user: {
                    _id: message.val().user._id,
                    avatar: message.val().user.avatar
                  }
          })
      })
      this.setState({messages: messages.reverse()});
    })
  }

  signOut(){
    // signOut the user
    firebaseApp.auth().signOut()
      .then(()=> {
        //Sign out successful
        this.props.navigator.popToTop();
      }, (error) => {
        console.log(error);
      })
  }

  onSend(inputText) {

    let message = inputText[0];
    let now = new Date;
    let utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

    // Need to improves id for message object
    message._id = Math.round(Math.random() * 1000000);
    message.createdAt = utc_timestamp;
    topicsRef.child('messages').push(message);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.signOut()}
          >
            <Text style={styles.link}>
              Sign Out
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>ChatApp</Text>

          <Text style={styles.title}>
            {this.state.displayName}
          </Text>
        </View>
        <View style={{flex: 24}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(inputText) => this.onSend(inputText)}
          user={{
            _id: this.state.uid,
            name: this.state.displayName,
            avatar: 'https://facebook.github.io/react/img/logo_og.png'
          }}
          isAnimated={true}
          renderTime={time => console.log(time)}
        />

        </View>
      </View>
    );
  }
}

module.exports = Topics;
