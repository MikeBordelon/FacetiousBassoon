import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import NewChallenge from '../components/newChallenge';
import ReactDOM, { findDOMNode } from 'react-dom';
import moment from 'moment';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class NewChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.postChallenge = this.postChallenge.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount () {

  }
////
  postChallenge (e) {
    e.preventDefault();



    var userId = this.props.user.id;
    var userEtherWallet = $('#userEtherWallet').val();
    var goalAmount = $('#goalAmount').val();
    var buyInAmount = $('#buyInAmount').val();
    var startDate = $('#startDate').val();
    console.log('This is the start date: ' + startDate);
    var expirationDate = $('#expirationDate').val();
    console.log('This is the expiration date: ' + expirationDate);
    var goalType = $('#goalType').val();


    console.log(startDate);
    console.log(expirationDate, goalType, goalAmount, buyInAmount);


    axios.post('/challenges', {
      'userId': userId,
      'startDate': startDate,
      'expirationDate': expirationDate,
      'goalType': goalType,
      'goalAmount': goalAmount,
      'buyInAmount': buyInAmount,
      'userEtherWallet': userEtherWallet
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
    $('#userEtherWallet').val('');
    $('#buyInAmount').val('');
    $('#goalAmount').val('');
    $('#startDate').val('');
    $('#expirationDate').val('');
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
    user: store.userState.user
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallengeContainer);
