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
  }

  componentDidMount () {
    axios.get('/user', {
      params: { id: this.props.userId }
    })
    .then(function(challenges) {
      console.log('got user challenges', challenges.data[0]);
      var challenges = challenges.data[0].challenges;
      store.dispatch(getChallengesSuccess(challenges));
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });

  }

  hideChallenge(index) {
    var challengeID = this.props.challenges[index].id;
  }

  render () {
    // console.log(this.props)
    return (
      <Challenges challenges={this.props.challenges}
                  hideChallenge={this.hideChallenge}
      />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    store,
    challenges: store.userState.challenges
  };
};

export default connect(mapStateToProps)(ChallengesContainer);
