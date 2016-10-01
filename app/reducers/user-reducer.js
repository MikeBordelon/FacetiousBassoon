
const initialState = {
  challenges: [],
  isLoggedIn: false,
  openCV: 'someCoolImages'

};

const userReducer = function(state = initialState, action) {

  switch (action.type) {


  case 'GET_CHALLENGES_SUCCESS':
    return {
      ...state,
      challenges: action.challenges
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
