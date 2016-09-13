import React, {Component} from 'react';
import {
  Navigator
}from 'react-native';

import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import Chat from './components/chat';


import ChooseName from './components/auth/chooseName';
import ForgotPassword from './components/auth/forgot-password';

const routes = {
  signIn: SignIn,
  signUp: SignUp,
  chat: Chat,
  chooseName: ChooseName,
  forgotPassword: ForgotPassword
}

class Main extends Component{


  renderScene(route, navigator){
    // To figure out how renderScene work, pay attention to the variable Component
    let Component = routes[route.name];

    // This is the same as 'let displayName = route.displayName'
    let {displayName, title, author, row_uid} = route;

    return (
      <Component
        // This is how website get their data from the navigator
        navigator={navigator}
        displayName={displayName}
        title={title}
        author={author}
        row_uid={row_uid}
      />
    );
  }

  render(){
    return(
      <Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
    );
  }
}

module.exports = Main;
