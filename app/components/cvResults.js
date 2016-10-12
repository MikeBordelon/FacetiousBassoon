import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

const style = {
  h2: {
    margin: '50% 0% 5% 0%'
  },
  result: {
    margin: '0% 0% 5% 0%'
  }
};

var CVResults = function (props) {
  return (
    <div>
      <h2 style={style.h2}>Your Results:</h2>
      <div>Your Before Measurement:</div>
      <div style={style.result}>{props.Before}</div>
      <div>Your After Measurement:</div>
      <div style={style.result}>{props.After}</div>
      <div>Pecentage Change:</div>
      <div>{((parseInt(props.Before)-parseInt(props.After))/parseInt(props.Before))*100}%</div>
    </div>
  )
};

export default CVResults;

