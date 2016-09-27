import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  users: []

};

const userReducer = function(state = initialState, action) {

  switch (action.type) {

  case types.GET_USERS_SUCCESS:
    return Object.assign({}, state, { users: action.users });

  case types.USER_PROFILE_SUCCESS:
    return Object.assign({}, state, { userProfile: action.userProfile });
  }

  return state;

};

export default userReducer;
