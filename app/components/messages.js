
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

  }

};




const messages = [
  {
    id: 1,
    amount: 300
  },
  {
    id: 2,
    amount: 300
  },
  {
    id: 3,
    amount: 300
  },

];

class Messages extends Component {
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

    // var activemessages = this.props.joinablemessages.filter(challenge => challenge.status !== 'failed');

    // return (


      // messages.map((message, index) => {
        return (
        <div >
         <List style={style.list}>
            <ListItem
              leftAvatar={<Avatar />}
              rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem >Hide Message</MenuItem>
                </IconMenu>
              }


              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>{'Other info: '}</span><br />
                  {'More Info?: '}
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
          </List>
        </div>
      // );
      // })
    );

  }
}

const mapStateToProps = function(store) {
  return {

  };
};

export default connect(mapStateToProps)(Messages);

