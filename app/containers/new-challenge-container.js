import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { postChallengeSuccess } from '../actions/user-actions';
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

  postChallenge (e) {
    e.preventDefault();

    var userId = this.props.userId;
    var userEtherWallet = $('#userEtherWallet').val();
    var goalAmount = $('#goalAmount').val();
    var buyInAmount = $('#buyInAmount').val();
    var startDate = $('#startDate').val();
    var expirationDate = $('#expirationDate').val();
    var goalType = $('#goalType').val();
    startDate = startDate + ':' + new Date().getSeconds() + '.' + '000' + 'Z';
    expirationDate = expirationDate + ':' + new Date().getSeconds() + '.' + '000' + 'Z';
    // console.log(moment(startDate).format());
    console.log(startDate);
    console.log(expirationDate);


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

      console.log('posted a challenge', res.data);
    })
    .catch(function(err) {
      console.log('challenge error', err);
    });

  }

  cancel (e) {
    e.preventDefault();
    $('#userId').val('');
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
    store,
    newChallenge: store.userState.newChallenge,
    userId: store.userState.userId
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallengeContainer);
