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


    var ethereum = $('#ethereum').val();
    var goal = $('#goal').val();
    var date = $('#date').val();
    var goalType = $('#goalType').val();

    console.log('etherAddress', ethereum, 'goal:', goal, 'date:', date, 'goal type:', goalType);
    console.log('userId is: ', this.props.userId);



    // axios.post('/challenges', {
    //   params: {
    //     userId: this.props.userId
    //   },
    //   data: {
    //     ethereum: ethereum,
    //     goal: goal,
    //     date: date,
    //     goalType: goalType
    //   }
    // })
    // .then(function(res) {
    // this.forceUpdate();
    //   console.log('posted a challenge', res);
    // })
    // .catch(function(err) {
    //   console.log('challenge error', err);
    // });

  }

  cancel () {
    $('#ethereum').val('');
    $('#goal').val('');
    $('#date').val('');
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
    store,
    newChallenge: store.userState.newChallenge,
    userId: store.userState.userId
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallengeContainer);
