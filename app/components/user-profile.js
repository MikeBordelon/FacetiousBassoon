
import React, {Component} from 'react';
import { Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

var moment = require('moment');

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
  }
};



class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleChallengeRequest = this.handleChallengeRequest.bind(this);

  }


  handleChallengeRequest() {
    console.log('You clicked the challenge button.');


  }


  render () {


    return (
      <div>
      <Paper style={style.paper} zDepth={1}>
        <h3 style={style.h3}>See Your Friends Challenges</h3>
      </Paper>

      <MobileTearSheet>
          <List>
            <ListItem
              primaryText="Chelsea Otakan"
              leftIcon={<ActionGrade color={pinkA200} />}
              rightAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              insetChildren={true}
              rightAvatar={<Avatar src="images/kolage-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              insetChildren={true}
              rightAvatar={<Avatar src="images/jsa-128.jpg" />}
            />
            <ListItem
              primaryText="Kerem Suer"
              insetChildren={true}
              rightAvatar={<Avatar src="images/kerem-128.jpg" />}
            />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              primaryText="Adelle Charles"
              leftAvatar={
                <Avatar
                  color={pinkA200} backgroundColor={transparent}
                  style={{left: 8}}
                >
                  A
                </Avatar>
              }
              rightAvatar={<Avatar src="images/adellecharles-128.jpg" />}
            />
            <ListItem
              primaryText="Adham Dannaway"
              insetChildren={true}
              rightAvatar={<Avatar src="images/adhamdannaway-128.jpg" />}
            />
            <ListItem
              primaryText="Allison Grayce"
              insetChildren={true}
              rightAvatar={<Avatar src="images/allisongrayce-128.jpg" />}
            />
            <ListItem
              primaryText="Angel Ceballos"
              insetChildren={true}
              rightAvatar={<Avatar src="images/angelceballos-128.jpg" />}
            />
          </List>
        </MobileTearSheet>


        <table className="table">
          <tbody>
            <tr className="thead-inverse">
                <th>Challenge ID</th>
                <th>Challenge Goal</th>
                <th>Current Stats</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Challenge Status</th>
                <th></th>
            </tr>

          {this.props.friendsChallenges.map((challenge, index) => {
            var joinChip;
            if (challenge.status === 'active') {
              joinChip =
                <Chip
                  onRequestDelete={this.handleChallengeRequest}
                  style={style.chip}
                  >
                  <Avatar color="#444" icon={<SvgIconFace />} />
                  Join Challenge!
                </Chip>;
            }

            return (
              <tr key={index}>
                <td className=''>{challenge.id}</td>
                <td className=''>{challenge.challengeGoal + ' ' + challenge.challengeType}</td>
                <td className=''>{challenge.challengeCurrent + ' ' + challenge.challengeType}</td>
                <td className=''>{moment(challenge.creationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                <td className=''>{moment(challenge.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                <td className=''>{challenge.status}</td>
                {joinChip}
              </tr>
            );
          })}
          </tbody>
        </table>
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














// return (
//     <div className="user-profile">
//       <div className="details">
//         <h3>Name: {props.profile.name}</h3>
//         <h3>Age: {props.profile.age}</h3>
//         <h3>Points: {props.profile.wallet}</h3>

//       </div>
//     </div>
//   );