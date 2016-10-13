import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  h2: {
    margin: '20% 0% 5% 0%'
  },
  result: {
    margin: '0px 50px 5px 0px'
  }
};

var CVResults = function (props) {
  return (
    <Paper>
      <h2 style={style.h2}>Your Results:</h2>
      <Menu selectedMenuItemStyle={style.result}>
         <MenuItem style={style.result} primaryText="Your Before Measurement:" secondaryText={props.Before}/>
         <MenuItem style={style.result} primaryText="Your After Measurement:" secondaryText={props.After}/>
         <MenuItem style={style.result} primaryText="Pecentage Change:" secondaryText={(((parseInt(props.Before)-parseInt(props.After))/parseInt(props.Before))*100).toFixed(2).toString() + '%'}/>
      </Menu>
    </Paper>
  )
};

export default CVResults;

