import React, {Component} from 'react';
import store from '../store';
import { connect } from 'react-redux';
import axios from 'axios';
import { generatePictureList } from '../actions/user-actions';
import { changeOutline } from '../actions/user-actions';
import UploadCloud from '../components/UploadCloud';
import CVResults from '../components/cvResults.js';
import PictureChoice from '../components/pictureChoice';
import { eraseOutlines } from '../actions/user-actions';
import { erasePictures } from '../actions/user-actions';
import { changeToggle } from '../actions/user-actions';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const style = {
  h3: {
    margin: '0px 0px 0px 450px '
  },
  button: {
    'textAlign': 'center',
    margin: '5% 0% 0% 0%'
  },
  calcChanges: {
    'textAlign': 'center',
    margin: '4% 0% 0% 0%'
  },
  video: {
    height: '60%',
    width: '60%',
    display: 'block',
    'marginTop': '25%',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  },
  toggle: {
    marginTop: '10px',
    marginLef: '10px'
  },
  label: {
    marginTop: '5px',
    marginRight: '10px'
  }
};

class OpenCVContainer extends Component {
  constructor (props) {
    super(props);
    this.ListInfo = this.ListInfo.bind(this);
    this.Calculate = this.Calculate.bind(this);
    this.TogFunc = this.TogFunc.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      loaderShow: false,
      open: false
    };
  }

  componentDidMount() {
    var context=this;
    context.ListInfo();

  }

  componentWillUnmount() {  
    store.dispatch(eraseOutlines());
    store.dispatch(changeToggle(null));
    store.dispatch(erasePictures());
  }

  ListInfo() {
    var context = this;

	  axios.get('/cloudinaryGet/' + context.props.userId)
	  .then(function(res) {
   	  store.dispatch(generatePictureList(res.data.resources));
    })
    .catch(function(err) {
      console.log('error retrieving Pictures', err);
    });
  }

  TogFunc() {
    console.log(this.props.toggleFlag);
    if (this.props.toggleFlag === false) {
      store.dispatch(changeToggle(true));
    } else {
      store.dispatch(changeToggle(false));
    }
  }

  handleRequestClose() {
    this.setState({open:false});
  }

  Calculate() {
    store.dispatch(eraseOutlines());
    if (Object.keys(this.props.comparedPictures.Before).length === 0 || Object.keys(this.props.comparedPictures.After).length === 0) {
      console.log('HERE');
      this.setState({open:true});
      return;
    }
    this.setState({loaderShow: true});

    var before = {
      url: this.props.comparedPictures.Before.url,
      public_id: this.props.comparedPictures.Before.public_id,
      userId: this.props.userId
    };
    var after = {
      url: this.props.comparedPictures.After.url,
      public_id: this.props.comparedPictures.After.public_id,
      userId: this.props.userId
    }

    axios.post('/openCV', before)
    .then(function(resBefore) {
      store.dispatch(changeOutline('Before', resBefore.data));
      axios.post('/openCV', after)
      .then(function(resAfter) {
        store.dispatch(changeOutline('After', resAfter.data));
        this.setState({loaderShow: false});
        store.dispatch(changeToggle(true));
      }.bind(this))
      .catch(function(err1) {
        console.log('error calculating', err1);
      });
    }.bind(this))
    .catch(function(err2) {
      console.log('error calculating', err2);
    });
  }

  render() {
    return (
      <div>
      	<div style={style.button}>
      		<UploadCloud ListInfo={this.ListInfo}/>
      	</div>
        <br/>
        <br/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <PictureChoice polarity={'Before'} /> 
            </div>
            <div id="calcChanges" className="col-md-4" style={style.calcChanges}>
              <Snackbar
                open={this.state.open}
                message="Please select two valid comparison photos"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose.bind(this)}
              />
              <RaisedButton backgroundColor='#7986CB' labelColor='white' style={{textAlign: 'center', margin: 'auto'}} onClick={this.Calculate.bind(this)} label="Calculate Change"/>
              {this.state.loaderShow ?  <video style={style.video} src='http://res.cloudinary.com/dsz0gov6k/video/upload/v1476296856/loader_fxru8l.mp4' autoPlay loop> </video> : null}
              {(this.props.comparedOutlines.showing) ? <CVResults Before={this.props.comparedOutlines.Before.context.custom.area} After={this.props.comparedOutlines.After.context.custom.area}/> : null}
              <div style={{marginTop:'20px', marginRight:'90px'}}>
                {(this.props.comparedOutlines.showing) ? <Toggle labelStyle={{marginLeft:'70px'}}onToggle={this.TogFunc.bind(this)} labelPosition='bottom' label="Regular || Outline" defaultToggled={true} /> : null}
              </div>
            </div>
            <div className="col-md-4">
              <PictureChoice polarity={'After'} /> 
            </div>
          </div>
        </div>
      </div>	
    );
  }
}

const mapStateToProps = function(store) {
  return {
    userPics: store.userState.userPictures,
    userId: store.userState.user.id,
    comparedPictures: store.userState.comparedPictures,
    comparedOutlines: store.userState.comparedOutlines,
    toggleFlag: store.userState.toggleFlag
  };
};

export default connect(mapStateToProps)(OpenCVContainer);