import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { changePicture } from '../actions/user-actions';

class PictureChoice extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   signature: ''
    // }
  }  

  updateChoice() {
  	var x = $("userPictures").value;
  	store.dispatch(changePicture(this.props.num, x));
  }

  render() {
	  <div className="form-group">
	    <label className="col-md-4 control-label" >Your Pictures</label>
	    <div className="col-md-4">
	      <select id="userPictures" className="form-control" onchange="updateChoice()">

	      {this.props.userPics.map((picture, index) => {
	        // console.log(index);
	        return (
	        	<option value={index}> {picture.tag} </option>
	        );
	      })}

	      </select>
	    </div>
	  </div>
  }
}

const mapStateToProps = function(store) {
  return {
    store,
    userPics: store.userState.userPictures
  };
};

export default connect(mapStateToProps)(PictureChoice);