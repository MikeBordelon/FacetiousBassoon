import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

const style = {
  h3: {
    margin: '0px 0px 0px 450px '
  },
  button: {
    display: 'none',
    margin: '0px 0px 0px 450px'
  }
};

const OpenCV = function (props) {
  console.log(props);
  return (

    <div>
      <h3 style={style.h3}>Upload an image to OpenDV!</h3>
      <div className="col-lg-6 col-sm-6 col-12 center-block">

        <label className="btn btn-primary ">
            Browse&hellip; <input type="file" style={style.button}/>
        </label>
      </div>
    </div>
  );
};


export default OpenCV;