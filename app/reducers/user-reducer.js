const initialState = {
  myChallenges: [],
  messages : [],
  joinableChallenges: [],
  isLoggedIn: false,
  user: {
    id: null,
    name: null,
    avatar: null,
    avatar150: null
  },
  userPictures: [],
  comparedPictures: {Before: {}, After: {}},
  comparedOutlines: {Before: {}, After: {}, showing: false},
  toggleFlag: null
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

    case 'GET_MY_MESSAGES':
    return {
      ...state,
      messages: action.messages
    };

    case 'HIDE_MY_MESSAGE':
    return {
      ...state,
      messages: state.messages.filter(message => message.id !== action.messageId)
    };

    case 'GET_JOINABLE_CHALLENGES':
    return {
      ...state,
      joinableChallenges: action.joinableChallenges
    };

    case 'HIDE_JOINABLE_CHALLENGE':
    return {
      ...state,
      joinableChallenges: state.joinableChallenges.filter(challenge => challenge.id !== action.challengeId)
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
      var temp = {};
      temp[action.changedPol] = state.userPictures[action.pictureIdx];
      temp[action.unchangedPol] = state.comparedPictures[action.unchangedPol];

      return {
        ...state,
        comparedPictures: temp
      };

    case 'CHANGE_OUTLINE':
      var temp = {};
      temp[action.changedPol] = action.picture;
      temp[action.unchangedPol] = state.comparedOutlines[action.unchangedPol];

      if (action.changedPol === 'After') {
        temp.showing = true;
      } else {
        temp.showing = false;
      }

      return {
        ...state,
        comparedOutlines: temp
      };

    case 'ERASE_OUTLINES':
      return {
        ...state,
        comparedOutlines: {Before: {}, After: {}, showing: false}
      };

    case 'ERASE_PICTURES':
      return {
        ...state,
        comparedPictures: {Before: {}, After: {}}
      };

    case 'CHANGE_TOGGLE':
      return {
        ...state,
        toggleFlag: action.flag
      };
  }

    return state;

}

export default userReducer;
