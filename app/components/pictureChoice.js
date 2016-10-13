import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { changePicture } from '../actions/user-actions';
import { eraseOutlines } from '../actions/user-actions';
import { changeToggle } from '../actions/user-actions';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    'marginTop': '10%',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  }
};


class PictureChoice extends Component {
  constructor (props) {
    super(props);
    this.updateChoice = this.updateChoice.bind(this);
    this.decideImage = this.decideImage.bind(this);
    this.state = {value: undefined};
  }  

  updateChoice(event, index, value) {
    this.setState({value});
    store.dispatch(changeToggle(null));
  	store.dispatch(changePicture(this.props.polarity, value-1));
    store.dispatch(eraseOutlines());
  }

  decideImage() {
    if (this.state.value != undefined) {
      if (this.props.toggleFlag === null || this.props.toggleFlag === false) {
        return <img style={style.img} src={this.props.comparedPictures[this.props.polarity].url}/>
      } else {
        return <img style={style.img} src={this.props.comparedOutlines[this.props.polarity].url}/>
      }
    } else {
      return;
    }
  }

  render() {
  	return(
      <div>  
  		  <div className="form-group">
  		    <label style={style.label}>Select {(this.props.polarity === 'Before') ? 'a Before' : 'an After'}</label>
  		    <br/>
  		       <DropDownMenu style={{width: '300px', marginLeft: '9%'}} id={"userPictures" + this.props.polarity} value={this.state.value || 'ChooseHere'} onChange= {this.updateChoice.bind(this)}>
  		      	<MenuItem value='ChooseHere' disabled primaryText='Choose Here'/>
              {this.props.userPics.map((picture, index) => {
  		     		  return (
  		        		<MenuItem key={index} value={index+1} primaryText={picture.created_at} />
  		          );
  	      		})}
  		       </DropDownMenu>
  		  </div>
        <div>
          {this.decideImage.call(this)}
        </div> 

      </div>
		);
  }
}

const mapStateToProps = function(store) {
  return {
    userPics: store.userState.userPictures,
    comparedPictures: store.userState.comparedPictures,
    comparedOutlines: store.userState.comparedOutlines,
    toggleFlag: store.userState.toggleFlag
  };
};

export default connect(mapStateToProps)(PictureChoice);