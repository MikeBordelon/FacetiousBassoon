import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserDashboard from '../components/user-dashboard';
import store from '../store';
import { getAllChallenges } from '../actions/user-actions';
import axios from 'axios';

class UserDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleJoinChallengeRequest = this.handleJoinChallengeRequest.bind(this);
  }

  componentDidMount () {
 // + this.props.userId
    axios.get('/user_joinable_challenges/' + this.props.userId)
      .then(function(challenges) {
        // console.log(challenges.data);

        var challenges = challenges.data;

        store.dispatch(getAllChallenges(challenges));
      })
      .catch(function(err) {
        console.log('error getting All Challenges', err);
      });
  }



  handleJoinChallengeRequest(challengeId) {

    axios.put('/challenges/ ' + challengeId, {
      'userId': this.props.userId,
      'userEtherWallet': 'testWallet'
    })
    .then(function(res) {
      axios.get('/user_joinable_challenges/' + this.props.userId)
        .then(function(challenges) {
          // console.log(challenges.data);

          var challenges = challenges.data;

          store.dispatch(getAllChallenges(challenges));
        })
        .catch(function(err) {
          console.log('error getting All Challenges', err);
        });
      console.log('user joined a challenge', res.data);
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });
  }





  render () {
    // console.log(store)


    // const profile = this.props.store.userState.profile;
    // const allChallenges = this.props.store.userState.allChallenges;
    return (
      <UserDashboard profile={this.props.profile}
                   allChallenges={this.props.allChallenges}
                   handleJoinChallengeRequest={this.handleJoinChallengeRequest}
      />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    store,
    profile: store.userState.profile,
    allChallenges: store.userState.allChallenges,
    userId: store.userState.userId
  };
};

export default connect(mapStateToProps)(UserDashboardContainer);
