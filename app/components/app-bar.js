import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router';
import axios from 'axios';
import {authSuccess, authFailure, getMessages} from '../actions/user-actions';
import store from '../store';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange700, cyan500, cyan700,
  pink200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';
import Avatar from 'material-ui/Avatar';
import PopoverMessages from './popover';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey300,
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: deepOrange700,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack
  },
  appBar: {
    height: 90,
    color: grey300,
    textColor: cyan700,
    // textColor: darkBlack,
    accent1Color: cyan700
  },
  menuItem: {
    color: grey300,
    textColor: cyan700
  },
  iconMenu: {
    color: grey300,
    textColor: cyan700
  }
});

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton href='/auth/fitbit' {...this.props} label="Login" />
    );
  }
}

// const Login = (props) => (
//   <IconMenu
//     {...props}
//     iconButtonElement={
//       <IconButton><MoreVertIcon /></IconButton>
//     }
//     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//   >
//     <MenuItem href='/auth/fitbit'> Login </MenuItem>
//     <MenuItem onClick={()=> { browserHistory.push('/about'); }}> About </MenuItem>
//     <MenuItem onClick={()=> { browserHistory.push('/'); }}> Home </MenuItem>
//   </IconMenu>
// );

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    iconStyle={{color: darkBlack}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

    <MenuItem onClick={()=> { browserHistory.push('/browseChallenges'); }}> Browse Challenges </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/dashboard'); }}> Dashboard </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/newChallenge'); }}> Create Challenge </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/pictureDifferences'); }}> Compare Pictures </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/about'); }}> About Us </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/'); }}> Home </MenuItem>
    <MenuItem href='/auth/logout'>Logout</MenuItem>
  </IconMenu>
);

Logged.muiName = 'IconMenu';


class AppBar2 extends Component {


  componentDidMount() {
    axios.get('/auth/checkLogin')
    .then(response => {
      // console.log(response);
      if (response.data.logInStatus === 'authenticated') {
        store.dispatch(authSuccess(response.data.user));
      } else {
        // store.dispatch(authFailure());
      }
      // console.log(store.getState());
    });

    axios.get('/messages')
      .then(function(messages) {
        // console.log('messages from DashboardContainer', messages.data);
        // console.log('messages container response', messages.data );
        var messages = messages.data;
        store.dispatch(getMessages(messages));
      })
      .catch(function(err) {
        console.log('GET messages error', err);
      });
  }


  render() {

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar

            style={{backgroundImage: 'url(http://completebody.com.au/images/Result-Banner.jpg)'}}
            title={<img style={{maxHeight:'80%', width: 'auto'}} src='http://res.cloudinary.com/dijpyi6ze/image/upload/v1476300641/Logomakr_0UFVLu_nu9mmm.png' />}
            iconElementLeft={ this.props.isLoggedIn ? <IconButton><PopoverMessages/></IconButton> : <span></span> }
            iconStyleLeft={{marginRight: '40px'}}
            iconElementRight={this.props.isLoggedIn ? <div><Avatar style={{marginBottom: '15px'}}src={this.props.avatar150} /><Logged /></div> : <Login />}

          />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    isLoggedIn: store.userState.isLoggedIn,
    avatar: store.userState.user.avatar,
    avatar150: store.userState.user.avatar150,
    userName: store.userState.user.name
  };
};

export default connect(mapStateToProps)(AppBar2);
