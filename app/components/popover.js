import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MessagesContainer from '../containers/messages-container';
import Message from 'material-ui/svg-icons/communication/message';

class PopoverMessages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap (event) {

    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  render() {

    var unreadMessages = this.props.messages.filter(message => message.read === false);

    return (
      <div>

        <FlatButton

          label={unreadMessages.length}
          onTouchTap={this.handleTouchTap}
          icon={<Message/>}
          primary={true}

        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <MessagesContainer />
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    messages: store.userState.messages,
  };
};

export default connect(mapStateToProps)(PopoverMessages);