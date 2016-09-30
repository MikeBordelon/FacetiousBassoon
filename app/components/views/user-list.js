import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: 60,
    width: 238,
    margin: '0 0 20px 500px'
  },


  text: {
    margin: '0 0 20px 500px'
  },

  h3: {
    margin: '0 0 20px 460px'
  },

  h4: {
    // display: 'inline-block',
    width: 400,
    margin: '0 0 0 0'

  },

  button: {
    display: 'inline-block',
    height: 30,
    width: 80,
    margin: '10px 0px 0px 80px'
  },
};

export default function (props) {
  // console.log(props);
  return (

    <div>
      <h3 style={style.h3}>Sign up for a new challenge!</h3>

      <Paper style={style.paper} zDepth={1}>
        <span><h4 style={style.h4}>Walk 10,000 steps in one day</h4></span>
        <span style={style.button}href="#" className="btn btn-primary btn-warning"><span className="glyphicon glyphicon-flash"></span> GO!</span>
      </Paper>

      {props.users.map((user, index) => {
        return (
          <div key={index}>
            <div style={style.text}>Page Count: {user.volumeInfo.pageCount}</div>
            <div style={style.text}> Book Title: {user.volumeInfo.title}</div>
          </div>
        );
      })}
    </div>
  );
}