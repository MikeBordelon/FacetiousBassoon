import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { postChallengeSuccess } from '../actions/user-actions';
import NewChallenge from '../components/newChallenge';
import ReactDOM, { findDOMNode } from 'react-dom';

class NewChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.postChallenge = this.postChallenge.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount () {
    // console.log(this.props.userId);
    // axios.get()
    // .then(response => {
    //   store.dispatch(getChallengesSuccess(response.data.items));
    //   return response.data.items;
    // });
  }

  postChallenge (e) {
    e.preventDefault();

    var userId = this.props.userId;
    var userEtherWallet = $('#userEtherWallet').val();
    var goalAmount = $('#goalAmount').val();
    var buyInAmount = $('#buyInAmount').val();
    var startDate = $('#startDate').val();
    var expirationDate = $('#expirationDate').val();
    var goalType = $('#goalType').val();

    console.log(
      'userId:', userId,
      'userEtherWallet', userEtherWallet,
      'goalAmount:', goalAmount,
      'goalType:', goalType,
      'buyInAmount:', buyInAmount,
      'startDate:', startDate,
      'expirationDate:', expirationDate
    );

    // { userId: '1',
    //   startDate: '2014-01-01T00:00:00.588Z',
    //   expirationDate: '2014-01-01T00:00:00.588Z',
    //   goalType: 'steps',
    //   goalAmount: '10000',
    //   buyInAmount: '1',
    //   userEtherWallet: 'ABC123'
    // },


    axios.post('/challenges', {

      data: {
        ethereum: userEtherWallet,
        goalAmount: goalAmount,
        goalType: goalType,
        buyInAmount: buyInAmount,
        startDate: startDate,
        expirationDate: expirationDate,
      }
    })
    .then(function(res) {

      console.log('posted a challenge', res);
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });

  }

  cancel (e) {
    e.preventDefault();
    $('#userId').val('');
    $('#ethereum').val('');
    $('#buyIn').val();
    $('#goal').val('');
    $('#startDate').val('');
    $('#endDate').val('');
    $('#goalType').val('');
  }

  render () {

    // console.log(this.props.userId);
    return (
      <NewChallenge postChallenge={this.postChallenge} cancel={this.cancel}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    store,
    newChallenge: store.userState.newChallenge,
    userId: store.userState.userId
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallengeContainer);
