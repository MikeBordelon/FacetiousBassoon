
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
  userPictures: [],
  comparedPictures: {one: {}, two: {}},
  newChallenge: false,
  userId: null,
  profile: {
    name: 'mike',
    age: '35',
    wallet: '1000000'
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

<<<<<<< e31b73bc01f00fe463538891144d7504d5a3695b

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

  case 'AUTH_SUCCESS':
  console.log('setting userId');
    return {
      ...state,
      isLoggedIn: true,
      userId: action.userId
    };

  case 'AUTH_FAILURE':
    return {
      ...state,
      isLoggedIn: false
    };
  
  case 'GET_PICTURES':
    return {
      ...state,
      userPictures: action.pictures
    };
    
  case 'CHANGE_PICTURE':
    return {
      ...state,
      comparedPictures: [action.num: state.userPictures[action.pictureIdx], unchangedNum: state.comparedPictures.action.unchangedNum]
    };  
  }

  return state;
  
};

export default userReducer;
