
import React, {Component} from 'react';
import { Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';


const style = {

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  paper: {
    height: '28px',
    width: '140px',
    margin: '20px 0px 20px 10px',

  },

  h3: {
    display: 'flex',
    // textAlign: 'center',
    // verticalAlign: 'middle',
    margin: '0px 0px 0px 10px'

  },

  create: {
    display: 'flex',
    margin: '0px 0px 0px 160px'
  },

  list: {
    flex: 1,
    width: '450px'

  },

  menuItem: {
    width: '100px',
    height: '50px'
  }

};



class Messages extends Component {
  constructor(props) {
    super(props);
  }


  render () {
    // console.log(this.props);

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    // var activemessages = this.props.joinablemessages.filter(challenge => challenge.status !== 'failed');
    // if (this.props.messages > 0) {}
    return (
    <div>

      <Subheader>Win/Lose Notifications</Subheader>
      {this.props.messages.map((message, index) => {
        return (

        <div key={index}>
         <List style={style.list}>
            <ListItem
              leftAvatar={<Avatar src={this.props.avatar}/>}
              rightIconButton={
                <IconMenu onClick={() => this.props.hideMessage(message.id)} iconButtonElement={iconButtonElement}>
                  <MenuItem primaryText={'Mark as Read'}/>
                </IconMenu>
              }


              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>{message.outcome === 'loser' ? message.outcome = 'Lost ' : 'Won '}</span>
                  <span style={{color: darkBlack}}>{'Read: ' + message.read}</span><br />
                  {'Amount: ' + '$' + message.amount}
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
          </List>
        </div>
      );
      }
      )}
    </div>
    );

  }
}

const mapStateToProps = function(store) {
  return {
    avatar: store.userState.user.avatar,
  };
};

export default connect(mapStateToProps)(Messages);

