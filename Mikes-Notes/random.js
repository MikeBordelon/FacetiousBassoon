Grid file size is 270 x 180
var unreadMessages = this.props.messages.filter(message => message.read === false);

<b>Goal Amount:</b>{challenge.goalAmount} <b>Start Date:</b>{moment(challenge.startDate).format('MM/DD/YY')} <b>End Date:</b>{moment(challenge.expirationDate).format('MM/DD/YY')} <b>Number of Participants:</b>{challenge.numOfParticipants}