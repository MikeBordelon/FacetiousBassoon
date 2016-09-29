import React from 'react';
import { connect } from 'react-redux';
import OpenCV from '../views/openCV';
import * as userApi from '../../api/user-api';
import store from '../../store';
import axios from 'axios';
import { getUsersSuccess } from '../../actions/user-actions';

const OpenCVContainer = React.createClass({

  componentDidMount: function() {

  },

  render: function() {
    console.log();
    return (
      <OpenCV openCVStuff={this.props.openCV}/>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    openCV: store.userState.openCV
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(OpenCVContainer);
