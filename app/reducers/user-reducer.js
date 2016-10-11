
const initialState = {
  myChallenges: [],
  joinableChallenges: [],
  isLoggedIn: false,
  user: {
    id: null,
    name: null,
    avatar: null,
    avatar150: null
  }
};

const userReducer = function(state = initialState, action) {

  switch (action.type) {


  case 'GET_MY_CHALLENGES':
    return {
      ...state,
      myChallenges: action.myChallenges
    };

  case 'GET_JOINABLE_CHALLENGES':
    return {
      ...state,
      joinableChallenges: action.joinableChallenges
    };


  case 'AUTH_SUCCESS':
    return {
      ...state,
      isLoggedIn: true,
      user: action.user
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
