import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: 60,
    width: 350,
    margin: '0 0 20px 500px'
  },

  text: {
    margin: '0 0 20px 500px'
  },

  h4: {
    display: 'inline-block',
    width: 250,

  },

  button: {
    display: 'inline-block',
    height: 20,
    width: 20,
  },
};

export default function (props) {
  console.log(props);
  return (

    <div>
      <h3 style={style.text}>Sign up for a new challenge!</h3>
      <Paper style={style.paper} zDepth={1}>
        <span><h4 style={style.h4}>Walk 10,000 steps in one day</h4></span>
        <span><RaisedButton style={style.button} label='Submit' secondary={true}/></span>
      </Paper>
      {props.users.map(user => {
        return (
          <div>
            <div style={style.text}>Page Count: {user.volumeInfo.pageCount}</div>
            <div style={style.text}> Book Title: {user.volumeInfo.title}</div>
          </div>
        );
      })}
    </div>
  );
}