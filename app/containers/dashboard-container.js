import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMyChallenges } from '../actions/user-actions';
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
