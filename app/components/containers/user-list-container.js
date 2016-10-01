import React from 'react';
import { connect } from 'react-redux';
import UserList from '../views/user-list';
import * as userApi from '../../api/user-api';
import store from '../../store';
import axios from 'axios';
import { getUsersSuccess } from '../../actions/user-actions';


const UserListContainer = React.createClass({

  componentDidMount: function() {
    axios.get('https://www.googleapis.com/books/v1/volumes?', {
      params: {
        q: 'Pot'
      }
    })
    .then(response => {
      store.dispatch(getUsersSuccess(response.data.items));
      return response;
    });
  },

  render: function() {
    return (
      <UserList users={this.props.users}/>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.userState.users
  };
};
// users are now props on UserListContainer
export default connect(mapStateToProps)(UserListContainer);
