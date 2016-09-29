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
  console.log(props);
  var loggedIn;
  var loginButton;

  if (props.isLoggedIn === true) {
    loggedIn = <li><Link to='/profile'>Profile</Link></li>;
    loginButton = <li><a href='#' >SIGNOUT</a></li>;
  } else {
    loginButton = <li><a href='#' >LOGIN</a></li>;
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
          {loggedIn}
          {loginButton}
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