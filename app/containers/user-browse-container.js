import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserBrowse from '../components/user-browse';
import Browse from '../components/browse';
import store from '../store';
import { getJoinableChallenges, hideJoinableChallenge } from '../actions/user-actions';
import axios from 'axios';

class UserBrowseContainer extends Component {
  constructor(props) {
    super(props);

    this.handleJoinChallengeRequest = this.handleJoinChallengeRequest.bind(this);
  }

  componentDidMount () {
    axios.get('/user_joinable_challenges/')
      .then(function(challenges) {
        // console.log('Joined a challenge');
        var challenges = challenges.data;
        store.dispatch(getJoinableChallenges(challenges));
      })
      .catch(function(err) {
        console.log('error getting All Challenges', err);
      });
  }



  handleJoinChallengeRequest(challengeId) {
    console.log($('#etherAddress').val());
    console.log('clicked');
    axios.put('/challenges/ ' + challengeId, {
      'userId': this.props.user.id,
      'userEtherWallet': $('#etherAddress').val()
    })
    .then(function(res) {
      console.log('challenge joined', res );
      // launch snackbar?
      store.dispatch(hideJoinableChallenge(challengeId));
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });
  }

  render () {
    // console.log(this.props);
    return (
      <Browse user={this.props.user} joinableChallenges={this.props.joinableChallenges}
                   handleJoinChallengeRequest={this.handleJoinChallengeRequest}

      />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    joinableChallenges: store.userState.joinableChallenges,
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(UserBrowseContainer);
