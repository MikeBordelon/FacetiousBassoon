import React, {Component} from 'react';
import { connect } from 'react-redux';
import Messages from '../components/messages';

import store from '../store';
import {getMessages, hideMessage} from '../actions/user-actions';
import axios from 'axios';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentDidMount () {
    axios.get('/messages/')
      .then(function(messages) {
        console.log(messages);
        console.log('Got messages', res );
        var messages = messages.data;
        store.dispatch(getMessages(messages));
      })
      .catch(function(err) {
        console.log('GET messages error', err);
      });
  }



  hideMessage() {
    axios.put('/messages/')
    .then(function(res) {
      console.log('hide a  message', res );
      store.dispatch(hideMessage());
      // what goes in hideMessage?
    })
    .catch(function(err) {
      console.log('hide messages error', err);
    });
  }

  render () {
    console.log(this.props);
    return (
      <Messages messages={this.props.messages}
                hideMessage={this.hideMessage}

      />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    messages: store.userState.messages,
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(MessagesContainer);
