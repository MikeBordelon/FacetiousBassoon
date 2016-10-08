import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { generatePictureList } from '../actions/user-actions';
import UploadCloud from '../components/UploadCloud';
import PictureChoice from '../components/pictureChoice';


const style = {
  h3: {
    margin: '0px 0px 0px 450px '
  },
  button: {
    margin: '100px 0px 0px 450px'
  }
};

class OpenCVContainer extends Component {
  constructor (props) {
    super(props);
    this.ListInfo = this.ListInfo.bind(this);
    // this.state = {
    //   signature: ''
    // };
  }

  componentDidMount() {
    var context=this;
    context.ListInfo();
    // console.log('didMount', context.state);
  	// this.ListInfo();
  }

  ListInfo() {
    var context = this;

	  axios.get('/cloudinaryGet/' + context.props.userId)
	  .then(function(res) {
	    console.log(res.data.resources);
   	  store.dispatch(generatePictureList(res.data.resources));
      // $('#userPictures').empty();

      // for(var i = 0; i < res.data.resources.length; i++) {
      //   var opt = document.createElement('option');
      //   opt.innerHTML = res.data.resources[i].public_id;
      //   opt.value = res.data.resources[i].public_id;
      //   // console.log($('userPictures'));
      //   $('#userPictures').append(opt);
      // }
      console.log(context.props.openCV);
    })
    .catch(function(err) {
      console.log('error retrieving Pictures', err);
    });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
      	<div style={style.button}>
      		<UploadCloud ListInfo={this.ListInfo}/>
      	</div>        
      </div>	
    );
  }
}

const mapStateToProps = function(store) {
  return {
    store,
    openCV: store.userState.openCV,
    userId: store.userState.userId
  };
};

export default connect(mapStateToProps)(OpenCVContainer);