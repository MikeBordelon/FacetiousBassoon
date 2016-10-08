import React, {Component} from 'react';
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

class UploadCloud extends Component {
  constructor (props) {
    super(props);
    
    // this.state = {
    // };
  }

  componentWillMount() {

  };

  render() {
    var context = this;
    $('#upload_widget_opener').cloudinary_upload_widget(
      { cloud_name: 'dsz0gov6k', upload_preset: 'FitBit', theme: 'minimal', folder: context.props.userId.toString(), button_class: 'btn btn-primary' },
      function(error, result) { 
        $('#upload_widget_opener').remove();
        context.props.ListInfo();
      }
    );
    
    return (
      <div>   
        <button id="upload_widget_opener" className="btn btn-primary">Upload multiple images</button>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    store,
    isLoggedIn: store.userState.isLoggedIn,
    userId: store.userState.userId
  };
};

export default connect(mapStateToProps)(UploadCloud);