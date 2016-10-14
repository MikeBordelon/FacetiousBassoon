import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMyChallenges, getMessages } from '../actions/user-actions';
import Dashboard from '../components/dashboard';
import Messages from '../components/messages';
import MessagesContainer from './messages-container';


class DashboardContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount () {

    axios.get('/myInfo')
    .then(function(challenges) {


      var challenges = challenges.data.challenges;
      store.dispatch(getMyChallenges(challenges));
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });


    // axios.get('/messages')
    //   .then(function(messages) {
    //     // console.log('messages from DashboardContainer', messages.data);
    //     // console.log('messages container response', messages.data );
    //     var messages = messages.data;
    //     store.dispatch(getMessages(messages));
    //   })
    //   .catch(function(err) {
    //     console.log('GET messages error', err);
    //   });



  }


  render () {

    return (
      <Dashboard myChallenges={this.props.myChallenges}
      />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    myChallenges: store.userState.myChallenges,
    user: store.userState.user,
  };
};

export default connect(mapStateToProps)(DashboardContainer);
