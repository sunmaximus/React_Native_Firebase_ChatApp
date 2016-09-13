import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import styles from '../../styles';
import {firebaseApp} from './authentication';

class SignIn extends Component{

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      result: ''
    };
  }

  // Constantly Checking if there is a valid user in the app
  componentDidMount(){
    console.log("did I start?");

    // Remember this is a listener. Therefore when ever a user sign in or sign
    // up. This will automatically navigate to the main page.
    firebaseApp.auth().onAuthStateChanged( user => {
      console.log(user);
      if(user){
        console.log('user', user);
        // navigate to our main application page.

        // This line also auto login when user create an account and Already
        // signIn. This is possible due to async storage.
        this.props.navigator.push({name: 'chat'});
      }
    })
  }

  signIn(){
    let {email, password} = this.state;

    console.log(email, password);
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error:', error.message);
        this.setState({result: error.message});
      }
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          placeholder='password'
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonContainer}
          onPress={()=> this.signIn()}>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({name: 'forgotPassword'})}
          >
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigator.push({name: 'signUp'})
          }}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


module.exports =  SignIn;
