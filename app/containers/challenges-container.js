import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getChallengesSuccess, deleteChallenge } from '../actions/user-actions';
import Challenges from '../components/challenges';

class ChallengesContainer extends Component {
  constructor(props) {
    super(props);

    this.deleteChallenge = this.deleteChallenge.bind(this);
  }

  componentDidMount () {
    axios.get('https://www.googleapis.com/books/v1/volumes?', {
      params: {
        q: 'Pot'
      }
    })
    .then(response => {
      store.dispatch(getChallengesSuccess(response.data.items));
      return response.data.items;
    });
  }


  deleteChallenge(index) {

    // update ID to match DB ID
    var challengeID = this.props.challenges[index].id;

    store.dispatch(deleteChallenge(challengeID));


    // axios.delete('/challenges', {
    //   params: {
    //     id: challengeID
    //   },
    // })
    // .then(function(res) {
    //   store.dispatch(deleteChallenge(challengeID));
    //   console.log('deleted a challenge', res);

    // })
    // .catch(function(err) {
    //   // console.log('delete challenge error', err);
    // });
  }

  render () {
    // console.log(this.props)
    return (
      <Challenges challenges={this.props.challenges}
                  deleteChallenge={this.deleteChallenge}
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
// users are now props on UserListContainer
export default connect(mapStateToProps)(ChallengesContainer);
