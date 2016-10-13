import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  h3: {
    margin: '0px 0px 0px 450px '
  },
  button: {
    margin: '100px 100px 100px 150px'
  }
};

class UploadCloud extends Component {
  constructor (props) {
    super(props);
    this.OpenWidget = this.OpenWidget.bind(this);
  }

  // componentDidMount() {
  //   var context = this;
  //   $('#upload_widget_opener').cloudinary_upload_widget(
  //     { cloud_name: 'dsz0gov6k', upload_preset: 'FitBit', max_image_width: 300, max_image_height: 300, thumbnails: 'false', theme: 'minimal', folder: context.props.userId.toString(), button_class: 'btn btn-primary btn-lg' },
  //     function(error, result) { 
  //       $('#upload_widget_opener').remove();
  //       context.props.ListInfo();
  //     }
  //   );
  // };

  OpenWidget() {
    var context = this;
    cloudinary.openUploadWidget({ cloud_name: 'dsz0gov6k', upload_preset: 'FitBit', max_image_width: 300, max_image_height: 300, thumbnails: 'false', theme: 'minimal', folder: context.props.userId.toString()},
      function(error, result) { context.props.ListInfo(); })
  }

  render() {
    return (
      <div>   
        <RaisedButton onClick={this.OpenWidget.bind(this)} label="Upload Pictures" primary={true}/>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    isLoggedIn: store.userState.isLoggedIn,
    userId: store.userState.user.id
  };
};

export default connect(mapStateToProps)(UploadCloud);