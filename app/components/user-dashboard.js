
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


/////////DropDown////////




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
    var activeChallenges = this.props.allChallenges.filter(challenge => challenge.status !== 'failed');

    return (
      <div>
      <Paper style={style.paper} zDepth={1}>
        <h3 style={style.h3}>All FitCoin Challenges</h3>
        <span>{this.props.profile.name}</span>{this.props.profile.age}<span>{this.props.profile.wallet}</span>
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
    store

  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(Profile);











// <table className="table">
//           <tbody>
//             <tr className="thead-inverse">
//                 <th>Challenge ID</th>
//                 <th>Challenge Goal</th>
//                 <th>Current Stats</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Challenge Status</th>
//                 <th></th>
//             </tr>

//           {this.props.allChallenges.map((challenge, index) => {
//             var joinChip;
//             if (challenge.status === 'active') {
//               joinChip =
//                 <Chip
//                   onRequestDelete={this.handleJoinChallengeRequest}
//                   style={style.chip}
//                   >
//                   <Avatar color="#444" icon={<SvgIconFace />} />
//                   Join Challenge!
//                 </Chip>;
//             }

//             return (
//               <tr key={index}>
//                 <td className=''>{challenge.id}</td>
//                 <td className=''>{challenge.challengeGoal + ' ' + challenge.challengeType}</td>
//                 <td className=''>{challenge.challengeCurrent + ' ' + challenge.challengeType}</td>
//                 <td className=''>{moment(challenge.creationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
//                 <td className=''>{moment(challenge.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
//                 <td className=''>{challenge.status}</td>
//                 {joinChip}
//               </tr>
//             );
//           })}
//           </tbody>
//         </table>