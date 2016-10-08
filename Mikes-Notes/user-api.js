import axios from 'axios';
import store from '../store';
import { getUsersSuccess, userProfileSuccess } from '../actions/user-actions';

/**
 * Get all users
 */

export function getUsers() {
  return axios.get('http://localhost:3001/users')
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    });
}

// /**
//  * Search users
//  */

// export function searchUsers(query = '') {
//   return axios.get('http://localhost:3001/users?q='+ query)
//     .then(response => {
//       store.dispatch(getUsersSuccess(response.data));
//       return response;
//     });
// }

// /**
//  * Delete a user
//  */

// export function deleteUser(userId) {
//   return axios.delete('http://localhost:3001/users/' + userId)
//     .then(response => {
//       store.dispatch(deleteUserSuccess(userId));
//       return response;
//     });
// }

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getProfile(userId) {

  // Start with an empty profile object and build it up
  // from multiple XHR requests.
  let profile = {};

  // Get the user data from our local database.
  return axios.get('http://localhost:3001/users/' + userId)
    .then(response => {

      let user = response.data;
      profile.name = user.name;
      profile.steps = user.steps;

      store.dispatch(userProfileSuccess(profile));
      profile.twitter = user.twitter;
      profile.worksOn = user.worksOn;

      // Then use the github attribute from the previous request to
      // sent two XHR requests to GitHub's API. The first for their
      // general user info, and the second for their repos.
      return Promise.all([
        axios.get('https://api.github.com/users/' + user.github),
        axios.get('https://api.github.com/users/' + user.github + '/repos')
      ]).then(results => {

        let githubProfile = results[0].data;
        let githubRepos = results[1].data;

        profile.imageUrl = githubProfile.avatar_url;
        profile.repos = githubRepos;

        store.dispatch(userProfileSuccess(profile));

        return;

      });

    });

}



import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store.js';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton'

let style = {
  text: {
    textAlign: 'center',
    margin: '40px 0px 50px 0px'
  },
  confirmSubmit: {
    visibility: 'invisible'
  },
  RaisedButton: {
    margin: '0 0 0 400px'
  }

};

class NewChallenge extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }


  handleTouchTap () {
    this.setState({
      open: true,
    });
  }


  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  render () {


    return (

    <div>
    <h4 style={style.text}>Add confirm that we have submitted alert and Fix TimeStamps</h4>
      <h1 style={style.text}>Create A Challenge!</h1>
      {this.state.visible ? <div style={style.confirmSubimt}>Thanks for making a new challenge!</div> : null}

      <form ref='form'className="form-horizontal">
        <fieldset>

          <div className="form-group">
            <label className="col-md-4 control-label" >Your UserId</label>
            <div className="col-md-4">
              <input ref='userId' id="userId" name="userId" type="text" placeholder={this.props.store.userState.userId} className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Ethereum Address</label>
            <div className="col-md-4">
              <input ref='userEtherWallet' id="userEtherWallet" name="userEtherWallet" type="text" placeholder="enter your ethereum address" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Goal</label>
            <div className="col-md-4">
              <input ref='goalAmount' id="goalAmount" name="goalAmount" type="text" placeholder="# of steps/floors" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Buy In Amount</label>
            <div className="col-md-4">
              <input ref='buyInAmount' id="buyInAmount" name="buyInAmount" type="number" placeholder="$0.00" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Starting Date</label>
            <div className="col-md-4">
              <input ref='startDate' id="startDate" name="startDate" type="datetime-local" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >End Date</label>
            <div className="col-md-4">
              <input ref='expirationDate' id="expirationDate" name="expirationDate" type="datetime-local" className="form-control input-md"/>
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label" >Goal Type</label>
            <div className="col-md-4">
              <select ref='goalType' id="goalType" name="goalType" className="form-control">
                <option value="steps">Steps</option>
                <option value="floors">Floors</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" ></label>
            <div className="col-md-1">
              <button onClick={ this.props.postChallenge} id="submitButton" name="submitButton" className="btn btn-primary">Submit</button>
            </div>
            <div className="col-md-1">
              <button onClick={ this.props.cancel} id="cancelButton" name="cancelButton" className="btn btn-danger">Cancel</button>
            </div>
          </div>

        </fieldset>
      </form>

    </div>
  );
  }
}



const mapStateToProps = function(store) {
  return {
    store
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallenge);





<div className="form-group">
            <label className="col-md-4 control-label" ></label>
            <div className="col-md-1">
              <button onClick={this.props.postChallenge} id="submitButton" name="submitButton" className="btn btn-primary">Submit</button>
            </div>
            <div className="col-md-1">
              <button onClick={this.props.cancel} id="cancelButton" name="cancelButton" className="btn btn-danger">Cancel</button>
            </div>
          </div>