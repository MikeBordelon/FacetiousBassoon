export function getUsersSuccess(users) {
  return {
    type: 'GET_USERS_SUCCESS',
    users
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

