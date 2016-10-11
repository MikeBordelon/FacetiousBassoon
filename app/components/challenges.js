import React from 'react';
import { Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
var moment = require('moment');


const style = {
  paper: {
    height: '70px',
    width: '500px',
    margin: '30px 0px 50px 400px',

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


export default function (props) {

  if (props.myChallenges.length > 0) {
    return (

      <div>
      <Paper style={style.paper} zDepth={1}>
        <h3 style={style.h3}>Your current challenges</h3>
      </Paper>

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

          {props.myChallenges.map((challenge, index) => {
            // console.log(index);
            return (
                    <tr key={index}>
                      <td style={style.tableCNT}>{challenge.id}</td>
                      <td className=''>{challenge.goalAmount + ' ' + challenge.goalType}</td>
                      <td className=''>{challenge.challengeCurrent + ' ' + challenge.challengeType}</td>
                      <td className=''>{moment(challenge.creationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                      <td className=''>{moment(challenge.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
                      <td className=''>{challenge.status}</td>
                    </tr>
            );
          })}
          </tbody>
        </table>
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
