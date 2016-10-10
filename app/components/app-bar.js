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
import {authSuccess, authFailure} from '../actions/user-actions';
import store from '../store';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange700, cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey300,
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
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
    height: 50,
    color: grey300,
    textColor: pinkA200,
    // textColor: darkBlack,
    accent1Color: pinkA200,
  },
  menuItem: {
    color: grey300,
    textColor: pinkA200,
  },
  iconMenu: {
    color: grey300,
    textColor: pinkA200,
  }
});


const Login = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem href='/auth/fitbit'> Login </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/about'); }}> About </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/'); }}> Home </MenuItem>
  </IconMenu>
);

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

    <MenuItem onClick={()=> { browserHistory.push('/dashboard'); }}> Dashboard </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/allChallenges'); }}> All Challenges </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/newChallenge'); }}> Create Challenge </MenuItem>
    <MenuItem onClick={()=> { browserHistory.push('/openCV'); }}> OpenCV </MenuItem>
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
      // console.log('authIng');
      if (response.data.logInStatus === 'authenticated') {
        store.dispatch(authSuccess(response.data.user.userId));
      } else {
        // store.dispatch(authFailure());
      }
      // console.log(store.getState());
    });
  }


  render() {
    console.log(this.props.isLoggedIn);
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            title="FitCoin"
            iconElementLeft={<IconButton></IconButton>}
            iconElementRight={this.props.isLoggedIn ? <Logged /> : <Login />}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    store,
    isLoggedIn: store.userState.isLoggedIn,
    userId: store.userState.userId
  };
};

export default connect(mapStateToProps)(AppBar2);
