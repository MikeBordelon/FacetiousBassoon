import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store.js';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


let style = {
  text: {
    textAlign: 'center',
    margin: '40px 0px 50px 0px'
  },
  submit: {
    margin: '0 0 0 440px'
  },
  cancel: {
    margin: '0 0px 100px 40px'
  }
};

class NewChallenge extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }


  handleTouchTap () {
    this.setState({
      open: true,
    });
  }


  handleRequestClose () {
    this.setState({
      open: false,
    });
  }
  render () {

    // console.log('store is: ', this.props);
    return (
    <div>
    <h4 style={style.text}>Fix TimeStamps</h4>
      <h1 style={style.text}>Create A Challenge!</h1>


      <form ref='form'className="form-horizontal">
        <fieldset>

          <div className="form-group">
            <label className="col-md-4 control-label" >Your UserId</label>
            <div className="col-md-4">
              <input ref='userId' id="userId" name="userId" type="text" placeholder={this.props.store.userState.userId} className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Ethereum Address</label>
            <div className="col-md-4">
              <input ref='userEtherWallet' id="userEtherWallet" name="userEtherWallet" type="text" placeholder="enter your ethereum address" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Goal</label>
            <div className="col-md-4">
              <input ref='goalAmount' id="goalAmount" name="goalAmount" type="text" placeholder="# of steps/floors" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Buy In Amount</label>
            <div className="col-md-4">
              <input ref='buyInAmount' id="buyInAmount" name="buyInAmount" type="number" placeholder="$0.00" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Starting Date</label>
            <div className="col-md-4">
              <input ref='startDate' id="startDate" name="startDate" type="datetime-local" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >End Date</label>
            <div className="col-md-4">
              <input ref='expirationDate' id="expirationDate" name="expirationDate" type="datetime-local" className="form-control input-md"/>
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label" >Goal Type</label>
            <div className="col-md-4">
              <select ref='goalType' id="goalType" name="goalType" className="form-control">
                <option value="steps">Steps</option>
                <option value="floors">Floors</option>
              </select>
            </div>
          </div>

        </fieldset>
      </form>
      <span>
         <RaisedButton
          style={style.submit}
          onTouchTap={this.handleTouchTap}
          onClick={this.props.postChallenge}
          label="Add to my Challenges"
         />
         <RaisedButton
          style={style.cancel}
          onClick={this.props.cancel}
          label="Cancel"
         />
         <Snackbar
          open={this.state.open}
          message="Event added to your challenges"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
         />
      </span>
    </div>
  );
  }
}



const mapStateToProps = function(store) {
  return {
    store
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(NewChallenge);





