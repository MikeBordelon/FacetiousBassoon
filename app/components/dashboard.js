import React, {Component} from 'react';
import { Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
var moment = require('moment');
var path = require ('path');
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
// import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 450,
    overflowY: 'auto',
  },
  button: {
    marginRight: 20
  }
};

var steps = ['http://cdn.grid.fotosearch.com/CSP/CSP129/k21951375.jpg', 'http://cdn2.wallpapersok.com/uploads/picture/391/4391/woman-running-sportswear.jpg?width=280&height=180', 'http://www.girlyblogger.com/wp-content/uploads/2016/07/15317-a-healthy-young-woman-running-outdoors-on-a-track-pv-270x180.jpg'];
var floor = ['http://cdn.grid.fotosearch.com/ULY/ULY339/u23313730.jpg', 'http://cdn.grid.fotosearch.com/BLD/BLD093/bld104498.jpg', 'http://cdn.grid.fotosearch.com/IMR/IMR012/is09ar8i9.jpg'];

var rand = steps[Math.floor(Math.random() * steps.length)];

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }


  render () {

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-right"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    return (
      <div style={styles.root}>
        <TextField id='etherAddress'
          floatingLabelText="Enter Your Ethereum Address"
        />

        <GridList
          cellHeight={180}
          style={styles.gridList}
        >

          <Subheader>Join A Challenge</Subheader>
          {this.props.joinableChallenges.map((challenge, index) => (
            <GridTile
              key={index}
              title={challenge.goalAmount + ' ' + challenge.goalType + ' ' + '$' + challenge.buyInAmount + ' fee'}
              subtitle={<span>by <b>{moment(challenge.expirationDate).format('MMMM Do YYYY, h:mm:ss a')}</b></span>}
              actionIcon={
                <FloatingActionButton
                onClick={() => this.props.handleJoinChallengeRequest(challenge.id)}
                mini={true} style={styles.button}>
                     <ContentAdd />
                </FloatingActionButton>
              }
            >
              <img src={challenge.goalType === 'steps' ? steps[Math.floor(Math.random() * steps.length)] : floor[Math.floor(Math.random() * floor.length)]}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Dashboard;