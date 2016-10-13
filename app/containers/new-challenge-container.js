import React, {Component} from 'react';
// import $ from 'jquery';
import { connect } from 'react-redux';

import NewChallenge from '../components/newChallenge';
import axios from 'axios';
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

  postChallenge (e, wallet) {
    var userId = this.props.user.id;
    var userEtherWallet = wallet;
    var goalAmount = $('#goalAmount').val();
    var buyInAmount = $('#buyInAmount').val() * 1000000000000000000;
    var startDate = $('#startDate').val();
    var expirationDate = $('#expirationDate').val();
    var goalType = $('#goalType').val();

    console.log(userEtherWallet);
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
export default connect(mapStateToProps)(NewChallengeContainer);
