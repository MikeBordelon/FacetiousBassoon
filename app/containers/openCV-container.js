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
  img: {
    height: '50%',
    width: '50%',
    display: 'block',
    'marginTop': '40%',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  }
};

class OpenCVContainer extends Component {
  constructor (props) {
    super(props);
    this.ListInfo = this.ListInfo.bind(this);
    this.Calculate = this.Calculate.bind(this);
    this.state = {
      loaderShow: false
    };
  }

  componentDidMount() {
    var context=this;
    context.ListInfo();
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

  Calculate() {
    store.dispatch(eraseOutlines());
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
              <button onClick={this.Calculate.bind(this)} className="btn btn-primary">Calculate Change</button>
              {this.state.loaderShow ? <img style={style.img} src='https://66.media.tumblr.com/7dd68c0249256fe7bf583542853720ca/tumblr_njueq8twt61s4fz4bo1_500.gif'/> : null}
              {(this.props.comparedOutlines.showing && $("#userPicturesBefore").val()) ? <CVResults Before={this.props.comparedOutlines.Before.context.custom.area} After={this.props.comparedOutlines.After.context.custom.area}/> : null}
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
    comparedOutlines: store.userState.comparedOutlines
  };
};

export default connect(mapStateToProps)(OpenCVContainer);