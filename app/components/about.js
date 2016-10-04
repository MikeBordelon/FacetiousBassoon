import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

const style = {
  height: '200px',
  width: '600px',
  margin: '100px 20px 20px 340px',
  textAlign: 'center',
  display: 'center'
};

const About = function (props) {
  // console.log(props);
  return (
    <div>
    <Paper style={style} zDepth={1}>
      <h1>About us</h1>
        <div>
          <p>
            We are a company that is focused on helping you become a fitter you!
            With the help of our tracking tools you can reach your goals with more transparency
            than ever before. Our company is also committed to donating to charities that help
            to foster a healthy lifestyle.
          </p>
        </div>
     </Paper>
    </div>
  );
};

export default About;