import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getChallengesSuccess } from '../actions/user-actions';
import Challenges from '../components/challenges';


class ChallengesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 'collapse'
    };
    this.hideChallenge = this.hideChallenge.bind(this);
    this.console = this.console.bind(this);
  }

  componentDidMount () {
    console.log('Challenge Cont', this.props.userId);

    axios.get('/user/', {
      params: {
        id: this.props.userId
      }
    })

      .then(function(challenges) {
        console.log('got myChallenges', challenges.data);
        var challenges = challenges.data[0].challenges;
        store.dispatch(getChallengesSuccess(challenges));
      })
      .catch(function(err) {
        console.log('challenge error', err);
      });
  }

  console () {
    // console.log(this.props.store);
  }

  hideChallenge(index) {
    var challengeID = this.props.challenges[index].id;
  }

  render () {
    // console.log('chall COnt ID', this.props.userId);
    return (
      <Challenges challenges={this.props.challenges}
                  console={this.console}
      />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    challenges: store.userState.challenges,
    userId: store.userState.userId,

  };
};

export default connect(mapStateToProps)(ChallengesContainer);
