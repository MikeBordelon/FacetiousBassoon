import React from 'react';
import { connect } from 'react-redux';
import UserProfile from '../components/user-profile';

const UserProfileContainer = React.createClass({

  componentDidMount: function() {

    userApi.getProfile(this.props.name);
  },

  render: function() {
    return (
      <UserProfile {...this.props.profile} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    profile: store.userState.userProfile
  };
};

export default connect(mapStateToProps)(UserProfileContainer);
