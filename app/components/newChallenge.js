import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

var axios = require('axios');



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
      value: null,
      eth: [],
      balance: null,
      ethGrab: false
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount () {
    axios.get('/accounts')
    .then((results) => {
      this.setState({
        ...this.state,
        eth: results.data,
        ethGrab: true
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTouchTap () {
    this.setState({
      open: true,
    });
  }

  handleChange (event, index, value) { 
    axios.get('/balance/' + value)
    .then((results) => {
      this.setState({
        ...this.state,
        balance: results.data,
        value
      });
    })
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  render () {

    return (
    <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }}>
      <h1 style={style.text}>Create A Challenge!</h1>

      <form ref='form'className="form-horizontal">
          <div className="form-group">
            <label className="col-md-4 control-label" >Ethereum Address</label>
            <div className="col-md-4">
              {this.state.ethGrab === false ? <TextField id='etherAddress' floatingLabelText="Enter Your Ethereum Address" /> : <SelectField 
                value={this.state.value}
                onChange={this.handleChange} 
                floatingLabelText={this.state.value === null ? 'No address selected' : 'Balance: ' + (this.state.balance/1000000000000000000) + ' ether'}
                floatingLabelFixed={true}
                autoWidth={false}
                style={{width: '400px'}}
                hintText="Select an ethereum address">{
                this.state.eth.map((obj, index) => {
                  return (
                    <MenuItem key={index} value={obj} primaryText={obj} />
                  );
                })}
            </SelectField>}
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Goal</label>
            <div className="col-md-4">
              <input ref='goalAmount' id="goalAmount" name="goalAmount" type="number" placeholder="# of steps/floors" className="form-control input-md"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" >Buy In Amount</label>
            <div className="col-md-4">
              <input ref='buyInAmount' id="buyInAmount" name="buyInAmount" type="number" placeholder="wei's" className="form-control input-md"/>
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

export default NewChallenge;





