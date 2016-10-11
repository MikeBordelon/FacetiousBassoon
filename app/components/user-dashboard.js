
import React, {Component} from 'react';
import { Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
var moment = require('moment');
var path = require ('path');
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

import {List, ListItem} from 'material-ui/List';

import Divider from 'material-ui/Divider';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';



const style = {

  chip: {
    margin: 4,
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  paper: {
    height: '70px',
    width: '500px',
    margin: '90px 0px 50px 400px',

  },

  h3: {
    display: 'flex',
    // textAlign: 'center',
    // verticalAlign: 'middle',
    margin: '0px 0px 0px 120px'

  },

  create: {
    display: 'flex',
    margin: '0px 0px 0px 160px'
  },

  list: {
    flex: 1,
    width: '450px'

  }

};





class Profile extends Component {
  constructor(props) {
    super(props);
  }


  render () {

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    // FILTER ACTIVE CHALLENGES
    var activeChallenges = this.props.joinableChallenges.filter(challenge => challenge.status !== 'failed');

    return (
      <div>
      <Paper style={style.paper} zDepth={1}>
        <h3 style={style.h3}>Dashboard</h3>
      </Paper>


      <TextField id='etherAddress'
      floatingLabelText="Enter Your Ethereum Address"
      />

      {activeChallenges.map((challenge, index) => {
        return (
        <div key={index}>
         <List style={style.list}>
            <ListItem
              leftAvatar={<Avatar />}
              rightIconButton={
                <IconMenu onClick={() => this.props.handleJoinChallengeRequest(challenge.id)} iconButtonElement={iconButtonElement}>
                  <MenuItem >Join</MenuItem>
                </IconMenu>
              }

              primaryText={challenge.goalAmount + ' ' + challenge.goalType}
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>{'Starts: ' + moment(challenge.creationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span><br />
                  {'Ends: ' + moment(challenge.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
          </List>
        </div>
      );
      })}


      </div>

    );

  }
}

const mapStateToProps = function(store) {
  return {

  };
};

export default connect(mapStateToProps)(Profile);

