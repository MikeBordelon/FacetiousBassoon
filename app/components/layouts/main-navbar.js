import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';

const style = {
  display: 'inline-block',
  margin: '0px 0px 0px 1160px',
  height: '100px',
  width: '100px'
};

const MainNavBar = function(props) {
  var loggedIn, loggerButton, openCV;

  if (props.isLoggedIn === true) {
    loggerButton = <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>;
    loggedIn = <li><Link to='/profile'>Profile</Link></li>;
    openCV = <li><Link to='/openCV'>OpenCV</Link></li>;
  } else {
    loggerButton = <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>;
    loggedIn = null;
  }
  return (
    // this is the nav bar essentially
  <div>
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
          <Link to='/'><a className="navbar-brand" href="#">FitCoin</a></Link>
        </div>
      <ul className="nav navbar-nav">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About us</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
      {loggerButton}
      {loggedIn}
      {openCV}
      </ul>
    </div>
  </nav>
      <main>
        {props.children}
      </main>
    </div>
    );
};









const mapStateToProps = function(store) {
  return {
    isLoggedIn: store.userState.isLoggedIn
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(MainNavBar);



// <MenuItem containerElement={<Link to="/" />} primaryText="Home" />
// <MenuItem containerElement={<Link to="/profile" />} primaryText="Profile" />