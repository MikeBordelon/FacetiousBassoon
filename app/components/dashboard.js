import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Messages from './messages';
import MessagesContainer from '../containers/messages-container';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DialogExampleSimple from './browseDialog';
import MailIcon from './mail-icon';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import store from '../store';
import {getMessages, hideMessage } from '../actions/user-actions';
import FlatButton from 'material-ui/FlatButton';
import Message from 'material-ui/svg-icons/communication/message';
import {deepOrange700, cyan500, cyan700,
  pink200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import PopoverMessages from './popover';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  paper: {
    height: '180px',
    width: '250px',
  },

  paperTitle: {
    // display: 'flex',
    textAlign: 'center',
    color: cyan500
  },

  paperText: {
    // display: 'flex',
    textAlign: 'center',

  },

  h1: {
    color: deepOrange700,
    textAlign: 'center',
    margin: '20px 0 30px 0'
  },

  h3: {
    display: 'flex',
    margin: '0px 0px 0px 10px'

  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '45%',
    overflowY: 'auto',
    marginRight: 20,
    marginLeft: 20
  },

  button: {
    marginRight: 20
  },

  notifications: {

  },

  createChallenge: {
    width: 120,
    margin: '0px 0px 30px 1115px',
    color: white
  },
};


var steps = ['http://cdn.grid.fotosearch.com/CSP/CSP129/k21951375.jpg', 'http://cdn2.wallpapersok.com/uploads/picture/391/4391/woman-running-sportswear.jpg?width=280&height=180', 'http://www.girlyblogger.com/wp-content/uploads/2016/07/15317-a-healthy-young-woman-running-outdoors-on-a-track-pv-270x180.jpg'];
var floor = ['http://cdn.grid.fotosearch.com/ULY/ULY339/u23313730.jpg', 'http://cdn.grid.fotosearch.com/BLD/BLD093/bld104498.jpg', 'http://cdn.grid.fotosearch.com/IMR/IMR012/is09ar8i9.jpg'];

const info = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
  </IconMenu>
);




class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openPopover: false,
      anchorEl: null,
      readMail: false,
      open: false,
      openForm: false,
    };

    this.checkMail = this.checkMail.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap (event) {
    event.preventDefault();

    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose () {
    this.setState({
      openPopover: false
    });
  }

  handleOpenDialog () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  checkMail () {
    this.setState({readMail: !this.state.readMail});
  }


  render () {

    const actions = [

      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />
    ];





    return (
      <div>


        <h1 style={style.h1}>Dashboard</h1>

        <RaisedButton style={style.createChallenge}
                      primary={true}
                      onClick={()=> browserHistory.push('/newChallenge')}>
                      Create Challenge
        </RaisedButton>




        {this.state.readMail ? <MessagesContainer /> : null}

        <GridList
          cellHeight={180}
          cols={3}
          padding={10}
          style={style.gridList}
        >
        {this.props.myChallenges.map((challenge, index) => (
          <GridTile
            key={index}
            title={'Goal: ' + challenge.goalAmount + ' ' + challenge.goalType + ' Buy-in:' + (challenge.buyInAmount / 1000000000000000000) + ' ether'}
            actionIcon={

            <div>
              <FlatButton
              style={{color: cyan700}}
              label="Info"
              onTouchTap={this.handleTouchTap}
              />

                <Popover
                  open={this.state.openPopover}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                <Paper style={style.paper}>
                <h3 style={style.paperTitle}>Challenge Info</h3>
                <span>
                  <p style={style.paperText}>
                    <b>Goal </b>{challenge.goalAmount} {challenge.goalType}<br/>
                    <b>Starts </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma ')}<br/>
                    <b>Ends </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma')}<br/>
                    <b>Number of Participants </b>{challenge.numOfParticipants}<br/>
                    <b>Buy-in Amount </b>{challenge.buyInAmount / 1000000000000000000} Ether<br/>
                    <b>Pot Total </b>{challenge.totalPot / 1000000000000000000} Ether<br/>

                  </p>
                </span>
                </Paper>

                </Popover>
              </div>

            }
            subtitle={
                <span><b>Starts </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma ')}
                <b>Ends </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma')}</span>}
            >
            <img src={challenge.goalType === 'steps' ? steps[Math.floor(Math.random() * steps.length)] : floor[Math.floor(Math.random() * floor.length)]}/>
          </GridTile>
        ))}
      </GridList>

      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(Dashboard);



