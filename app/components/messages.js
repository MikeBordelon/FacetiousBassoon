
import React, {Component} from 'react';
import { Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {white, grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';


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
    width: '350px'

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
    console.log('messages from MESSAGES', this.props.messages);

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    var unreadMessages = this.props.messages.filter(message => message.read === false);
    console.log(unreadMessages);
    return (
    <div>

      {unreadMessages.map((message, index) => {
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
                  <span style={{color: darkBlack}}>{message.outcome === 'loser' ? 'You Lost' : ' You Won!'}</span>
                  <span style={{color: darkBlack}}></span>  Date:{moment(message.updatedAt).format('MM/DD/YY')}<br />
                  {'Amount: ' + Math.abs(message.amount / 1000000000000000000) + ' Ether'}
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
    messages: store.userState.messages
  };
};

export default connect(mapStateToProps)(Messages);

