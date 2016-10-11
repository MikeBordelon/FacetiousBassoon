import React, {Component} from 'react';
import { connect } from 'react-redux';
import OpenCV from '../components/openCV';
import store from '../store';
import axios from 'axios';
import { getUsersSuccess } from '../actions/user-actions';


class OpenCVContainer extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log(store.getState());
    return (
      <OpenCV openCVStuff={this.props.openCV}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    openCV: store.userState.openCV
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(OpenCVContainer);
