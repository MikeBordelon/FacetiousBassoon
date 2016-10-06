
const initialState = {
  challenges: [],
  allChallenges: [],
  isLoggedIn: false,
  openCV: 'someCoolImages',
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


  case 'GET_CHALLENGES_SUCCESS':
    return {
      ...state,
      challenges: action.challenges
    };

    case 'GET_ALL_CHALLENGES_SUCCESS':
    return {
      ...state,
      allChallenges: action.allChallenges
    };

    case 'DELETE_CHALLENGE_SUCCESS':
    return {
      ...state,
      // need the correct dbID
      challenges: state.challenges.filter(challenge => challenge.id !== action.challengeID)
    };

    case 'POST_CHALLENGE_SUCCESS':
    return {
      ...state,
      newChallenge: action.newChallenge
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
  }


  return state;

};

export default userReducer;
