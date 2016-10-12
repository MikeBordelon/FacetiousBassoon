import moment from 'moment';

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
  var picArray = pics.map(function(picture) {
    picture.created_at = moment(picture.created_at).format('x');
    return picture;
  });

  picArray.sort(function compareNumbers(a, b) {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  });

  var picArray = picArray.map(function(picture) {
    picture.created_at = moment(parseInt(picture.created_at)).format('MMMM Do YYYY, h:mm:ss a');
    return picture;
  });

  return {
    type: 'GET_PICTURES',
    pictures: picArray
  };
}

export function changePicture(polarity, idx) {
  var unchangedPol = '';
  
  if (polarity === 'Before') {
    unchangedPol = 'After';
  } else {
    unchangedPol = 'Before';
  }

  return {
    type: 'CHANGE_PICTURE',
    changedPol: polarity,
    unchangedPol: unchangedPol,
    pictureIdx: idx
  };
}

export function changeOutline(polarity, picture) {
  var unchangedPol = '';

  if (polarity === 'Before') {
    unchangedPol = 'After';
  } else {
    unchangedPol = 'Before';
  }

  return {
    type: 'CHANGE_OUTLINE',
    changedPol: polarity,
    unchangedPol: unchangedPol,
    picture: picture
  };
}

export function eraseOutlines() {
  return {
    type: 'ERASE_OUTLINES'
  };
}



