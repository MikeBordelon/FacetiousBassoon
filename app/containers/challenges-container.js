import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { getChallengesSuccess } from '../actions/user-actions';
import Challenges from './components/challenges';

const ChallengesContainer = React.createClass({

  componentDidMount: function() {
    axios.get('https://www.googleapis.com/books/v1/volumes?', {
      params: {
        q: 'Pot'
      }
    })
    .then(response => {
      store.dispatch(getChallengesSuccess(response.data.items));
      return response.data.items;
    });
  },

  render: function() {
    return (
      <Challenges challenges={this.props.challenges}/>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    store,
    challenges: store.userState.challenges
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(ChallengesContainer);
