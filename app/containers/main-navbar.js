
import React, {Component} from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import axios from 'axios';
import {authSuccess, authFailure} from '../actions/user-actions.js';
import store from '../store.js';


const style = {
  display: 'inline-block',
  margin: '0px 0px 0px 1160px',
  height: '100px',
  width: '100px'
};


class MainNavBar extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/auth/checkLogin').then(response => {
      if (response.data.logInStatus === 'authenticated') {
        store.dispatch(authSuccess(response.data.user.userId));
      } else {
        store.dispatch(authFailure());
      }
      // console.log(store.getState());
    });
  }

  render() {
    var loggedIn, loggerButton, openCV, newChallenge;

    if (this.props.isLoggedIn === true) {
      loggerButton = <li><a href="/auth/logout"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>;
      loggedIn = <li><Link to='/allChallenges'>Challenges</Link></li>;
      newChallenge = <li><Link to='/newChallenge'>Make A New Challenge</Link></li>;
      openCV = <li><Link to='/openCV'>OpenCV</Link></li>;
    } else {
      loggerButton = <li><a href="/auth/fitbit"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>;
      loggedIn = null;
    }
    return (
      // this is the nav bar essentially
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to='/'>FitCoin</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About Us</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {loggedIn}
              {newChallenge}
              {openCV}
              {loggerButton}
            </ul>
          </div>
        </nav>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    store,
    isLoggedIn: store.userState.isLoggedIn
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(MainNavBar);
