export function getChallengesSuccess(challenges) {
  return {
    type: 'GET_CHALLENGES_SUCCESS',
    challenges: challenges
  };
}


export function getAllChallenges(allChallenges) {
  return {
    type: 'GET_ALL_CHALLENGES_SUCCESS',
    allChallenges: allChallenges
  };
}

export function deleteChallenge(challengeID) {
  // console.log('ID in user-actions', challengeID);
  return {
    type: 'DELETE_CHALLENGE_SUCCESS',
    challengeID: challengeID
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

