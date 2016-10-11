export function getMyChallenges(myChallenges) {
  return {
    type: 'GET_MY_CHALLENGES',
    myChallenges: myChallenges
  };
}

export function getMessages(messages) {
  return {
    type: 'GET_MY_MESSAGES',
    messages: messages
  };
}

export function getJoinableChallenges(joinableChallenges) {
  return {
    type: 'GET_JOINABLE_CHALLENGES',
    joinableChallenges: joinableChallenges
  };
}


export function authSuccess(user) {
  return {
    type: 'AUTH_SUCCESS',
    isLoggedIn: true,
    user: user
  };
}

export function authFailure() {
  return {
    type: 'AUTH_FAILURE',
    isLoggedIn: false
  };
}

