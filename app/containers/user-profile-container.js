import React from 'react';
import { connect } from 'react-redux';
import UserProfile from '../components/user-profile';

const UserProfileContainer = React.createClass({

  componentDidMount: function() {

    // userApi.getProfile(this.props.name);
  },

  render: function() {
    const profile = this.props.store.userState.profile;
    return (
      <UserProfile profile={profile}
                   profile2={this.props.profile}
      />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    store,
    profile: store.userState.userProfile
  };
};

export default connect(mapStateToProps)(UserProfileContainer);
