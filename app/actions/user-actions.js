export function getChallengesSuccess(challenges) {
  return {
    type: 'GET_CHALLENGES_SUCCESS',
    challenges: challenges
  };
}

export function postChallengeSuccess(newChallenge) {
  return {
    type: 'POST_CHALLENGE_SUCCESS',
    newChallenge: newChallenge
  };
}

export function authSuccess(userId) {
  return {
    type: 'AUTH_SUCCESS',
    isLoggedIn: true,
    userId: userId
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
    userProfile: userProfile
  };
}

