
const initialState = {
  users: [],
  isLoggedIn: true,
  openCV: 'someCoolImages'

};

const userReducer = function(state = initialState, action) {

  switch (action.type) {


  case 'GET_USERS_SUCCESS':
    return {
      ...state,
      users: action.users
    };

  case 'AUTH_SUCCESS':
    return {
      ...state,
      isLoggedIn: true
    };


  case 'AUTH_FAILURE':
    return {
      ...state,
      isLoggedIn: false
    };
  }

  return state;

};

export default userReducer;
