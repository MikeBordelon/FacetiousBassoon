import React from 'react';
import { Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
var moment = require('moment');
import Messages from './messages';
import MessagesContainer from '../containers/messages-container';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



const style = {
  paper: {
    height: '30px',
    width: '200px',
    margin: '30px 0px 50px 400px',

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

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 450,
    overflowY: 'auto',
    marginRight: 20,
    marginLeft: 20
  },

  button: {
    marginRight: 20
  }
};


var steps = ['http://cdn.grid.fotosearch.com/CSP/CSP129/k21951375.jpg', 'http://cdn2.wallpapersok.com/uploads/picture/391/4391/woman-running-sportswear.jpg?width=280&height=180', 'http://www.girlyblogger.com/wp-content/uploads/2016/07/15317-a-healthy-young-woman-running-outdoors-on-a-track-pv-270x180.jpg'];
var floor = ['http://cdn.grid.fotosearch.com/ULY/ULY339/u23313730.jpg', 'http://cdn.grid.fotosearch.com/BLD/BLD093/bld104498.jpg', 'http://cdn.grid.fotosearch.com/IMR/IMR012/is09ar8i9.jpg'];

const info = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

  </IconMenu>
);

export default function (props) {

  if (props.myChallenges.length > 0) {
    return (
      <div>
        <Paper style={style.paper} zDepth={1}>
          <h3 style={style.h3}>Dashboard</h3>
        </Paper>

        <MessagesContainer/>

        <GridList
          cellHeight={280}
          cols={3}
          style={style.gridList}
        >
        <Subheader>Your Challenges</Subheader>
        {props.myChallenges.map((challenge, index) => (
          <GridTile

            key={index}
            title={'Goal ' + challenge.goalAmount + ' ' + challenge.goalType + ' Buy-in' + challenge.buyInAmount + ' ether'}
            actionIcon={
              <IconMenu
                {...props}
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >

              </IconMenu>
            }
            subtitle={
                <span><b>Starts </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma ')}
                <b>Ends </b>{moment(challenge.expirationDate).format('MM/DD/YY, h:mma')}</span>}
          >

            <img src={challenge.goalType === 'steps' ? steps[Math.floor(Math.random() * steps.length)] : floor[Math.floor(Math.random() * floor.length)]}/>
          </GridTile>
        ))}
      </GridList>

      </div>
    );
  } else {
    return (
      <div>
        <Paper style={style.paper}zDepth={1}>
          <h3 style={style.h3}>Create a challenge!</h3>
          <button style={style.create} className="btn btn-success" onClick={()=> browserHistory.push('/newChallenge')}>Create Challenge</button>
        </Paper>
      </div>
      );
  }

}


// <table className="table">
//           <tbody>
//             <tr className="thead-inverse">
//               <th>Challenge ID</th>
//               <th>Challenge Goal</th>
//               <th>Stats</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Challenge Status</th>
//               <th></th>
//             </tr>
//           {props.myChallenges.map((challenge, index) => {

//             return (
//               <tr key={index}>
//                 <td style={style.tableCNT}>{challenge.id}</td>
//                 <td className=''>{challenge.goalAmount + ' ' + challenge.goalType}</td>
//                 <td className=''>{'Created by UserId: ' + ' ' + challenge.creatorUserId + ' ' + 'Num of People: ' + challenge.numOfParticipants}</td>
//                 <td className=''>{moment(challenge.creationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
//                 <td className=''>{moment(challenge.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
//                 <td className=''>{challenge.status}</td>
//               </tr>
//             );
//           })}
//           </tbody>
//         </table>