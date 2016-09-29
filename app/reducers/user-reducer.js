
const initialState = {
  users: [],
  isLoggedIn: false

};

const userReducer = function(state = initialState, action) {

  switch (action.type) {

  case 'GET_USERS_SUCCESS':
    return Object.assign({}, state, { users: action.users });

  case 'USER_PROFILE_SUCCESS':
    return Object.assign({}, state, { userProfile: action.userProfile });
  }

  return state;

};

export default userReducer;
