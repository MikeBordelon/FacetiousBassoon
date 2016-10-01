import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { postChallengeSuccess } from '../actions/user-actions';
import NewChallenge from '../components/newChallenge';
import ReactDOM, { findDOMNode } from 'react-dom';
import $ from 'jquery';

class NewChallengeContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount () {
    // axios.get()
    // .then(response => {
    //   store.dispatch(getChallengesSuccess(response.data.items));
    //   return response.data.items;
    // });
  }

  postChallenge (e) {
    e.preventDefault();

    var ethereum = $('#ethereum').val();
    var goal = $('#goal').val();
    var date = $('#date').val();
    var goalType = $('#goalType').val();

    console.log(ethereum, goal, date, goalType);

    axios.post('/challenges/UserID', {
      data: {
        ethereum: ethereum,
        goal: goal,
        date: date,
        goalType: goalType

      }
    })
    .then(function(res) {
      console.log('posted a challenge', res);
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });

  }

  render () {
    return (
      <NewChallenge postChallenge={this.postChallenge}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    store,
    newChallenge: store.userState.newChallenge
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallengeContainer);
