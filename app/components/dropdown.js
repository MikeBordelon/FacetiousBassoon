import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange (event, index, value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={true}>
        <MenuItem value={1} primaryText="Never" />
        <MenuItem value={2} primaryText="Every Night" />
        <MenuItem value={3} primaryText="Weeknights" />
        <MenuItem value={4} primaryText="Weekends" />
        <MenuItem value={5} primaryText="Weekly" />
      </DropDownMenu>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    store,
    profile: store.userState.profile,
    allChallenges: store.userState.allChallenges,
    userId: store.userState.userId
  };
};

export default connect(mapStateToProps)(Dropdown);