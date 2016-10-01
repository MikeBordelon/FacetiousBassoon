export function getChallengesSuccess(challenges) {
  return {
    type: 'GET_CHALLENGES_SUCCESS',
    challenges
  };
}

export function authSuccess() {
  return {
    type: 'AUTH_SUCCESS',
    isLoggedIn: true
  };
}

export function authFailure() {
  return {
    type: 'AUTH_FAILURE',
    isLoggedIn: false
  };
}

export function userProfileSuccess(userProfile) {
  return {
    type: 'USER_PROFILE_SUCCESS',
    userProfile
  };
}

