import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store.js';



const style = {
  text: {
    textAlign: 'center',
    margin: '40px 0px 50px 0px'
  }
};

class NewChallenge extends Component {
  constructor (props) {
    super(props);
  }
  // console.log(props);
//   ethereumAdd string
// date
// metricGoal number textbox
// metrictype = steps Picker
  render () {

    // console.log('store is: ', this.props.store);
    return (
    <div>
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
              <input ref='ethereum' id="ethereum" name="ethereum" type="text" placeholder="enter your ethereum address" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Goal</label>
            <div className="col-md-4">
              <input ref='goal' id="goal" name="goal" type="text" placeholder="# of steps/floors" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Buy In Amount</label>
            <div className="col-md-4">
              <input ref='buyIn' id="buyIn" name="buyIn" type="text" placeholder="Buy-In Amount" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Ending Date</label>
            <div className="col-md-4">
              <input ref='date' id="date" name="date" type="date" className="form-control input-md"/>
            </div>
          </div>


          <div className="form-group">
            <label className="col-md-4 control-label" >Goal Type</label>
            <div className="col-md-4">
              <select ref='goalType' id="goalType" name="goalType" className="form-control">
                <option value="1">Steps</option>
                <option value="2">Floors</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" ></label>
            <div className="col-md-1">
              <button onClick={this.props.postChallenge} id="submitButton" name="submitButton" className="btn btn-primary">Submit</button>
            </div>
            <div className="col-md-1">
              <button onClick={this.props.cancel} id="cancelButton" name="cancelButton" className="btn btn-danger">Cancel</button>
            </div>
          </div>

        </fieldset>
      </form>

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





