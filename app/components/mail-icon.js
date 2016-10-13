// import React, { Component } from 'react';
// import Badge from 'material-ui/Badge';
// import IconButton from 'material-ui/IconButton';
// import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import store from '../store';
// import {getMessages, hideMessage} from '../actions/user-actions';
// import deepOrange700 from 'material-ui/styles/colors';
// import FlatButton from 'material-ui/FlatButton';
// import Message from 'material-ui/svg-icons/communication/message';

// const style = {
//   badge: {
//     color: deepOrange700
//   }
// };

// class MailIcon extends Component {
//   constructor(props) {
//     super(props);
//   }

//   // componentDidMount () {
//   //   axios.get('/messages')
//   //     .then(function(messages) {
//   //       // console.log(messages);
//   //       // console.log('messages container response', messages.data );
//   //       var messages = messages.data;
//   //       store.dispatch(getMessages(messages));
//   //     })
//   //     .catch(function(err) {
//   //       console.log('GET messages error', err);
//   //     });
//   // }

//   render () {

//     var unreadMessages = this.props.messages.filter(message => message.read === false);
//     console.log(this.props.messages);
//     return (
//       <div>
//         <Badge
//           badgeContent={unreadMessages.length}
//           secondary={true}
//           badgeStyle={{top: 20, right: 10}}
//         >
//           <FlatButton label='Unread Messages' primary={true}
//           icon={<Message/>}
//           />
//         </Badge>
//       </div>
//     );
//   }
// }


// const mapStateToProps = function(store) {
//   return {
//     messages: store.userState.messages
//   };
// };

// export default connect(mapStateToProps)(MailIcon);