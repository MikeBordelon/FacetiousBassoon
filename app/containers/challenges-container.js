import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMyChallenges } from '../actions/user-actions';
import Challenges from '../components/challenges';
import Messages from '../components/messages';
import MessagesContainer from './messages-container';

class ChallengesContainer extends Component {
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
      <Challenges myChallenges={this.props.myChallenges}
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

export default connect(mapStateToProps)(ChallengesContainer);
