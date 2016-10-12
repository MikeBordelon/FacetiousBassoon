import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { changePicture } from '../actions/user-actions';
import { eraseOutlines } from '../actions/user-actions';

const style = {
  h3: {
    margin: '0px 0px 0px 450px '
  },
  button: {
    display: 'none',
    margin: '0px 0px 0px 450px'
  },
  label: {
  	'fontSize': '150%',
  	margin: '0% 0% 5% 30%'
  },
  img: {
    display: 'block',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  },
  img2: {
    display: 'block',
    'marginTop': '15%',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  }
};


class PictureChoice extends Component {
  constructor (props) {
    super(props);
    this.updateChoice = this.updateChoice.bind(this);
  }  

  updateChoice() {
  	var x = $("#userPictures" + this.props.polarity).val();
  	store.dispatch(changePicture(this.props.polarity, x));
    store.dispatch(eraseOutlines());
  }

  render() {
  	return(
      <div>  
  		  <div className="form-group">
  		    <label style={style.label}>Select {(this.props.polarity === 'Before') ? 'a Before' : 'an After'}</label>
  		    <br/>

  		      <select defaultValue='ChooseHere' id={"userPictures" + this.props.polarity} className="form-control" onChange= {this.updateChoice.bind(this)}>
  		      	<option value='ChooseHere' disabled >Choose here</option>
              {this.props.userPics.map((picture, index) => {
  		     		  return (
  		        		<option key={index} value={index}> {picture.created_at} </option>
  		          );
  	      		})}
  		      </select>
  		  </div>
        <div>
          {($("#userPictures" + this.props.polarity).val()) ? 
          <img style={style.img} src={this.props.comparedPictures[this.props.polarity].url}/> :
          null}
        </div>
         <div>
          {(this.props.comparedOutlines.showing && $("#userPictures" + this.props.polarity).val()) ? <img style={style.img2} src={this.props.comparedOutlines[this.props.polarity].url}/> : null}
        </div>
      </div>  
		);
  }
}

const mapStateToProps = function(store) {
  return {
    userPics: store.userState.userPictures,
    comparedPictures: store.userState.comparedPictures,
    comparedOutlines: store.userState.comparedOutlines
  };
};

export default connect(mapStateToProps)(PictureChoice);