export function getMyChallenges(myChallenges) {
  return {
    type: 'GET_MY_CHALLENGES',
    myChallenges: myChallenges
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

export function generatePictureList(pics) {
  return {
    type: 'GET_PICTURES',
    pictures: pics
  };
}

export function changePicture(num, idx) {
  var unchangedNum = '';
  
  if (num === 'one') {
    unchangedNum = 'two';
  } else {
    unchangedNum = 'one';
  }

  return {
    type: 'CHANGE_PICTURE',
    num: num,
    unchangedNum: unchangedNum,
    pictureIdx: idx
  };
}


