var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var {app} = require('../../server/server');
var {db, User, Challenge, UserChallenges} = require('../../server/database/db-config');


var testUser = {
  name: 'Mike Bordelon',
  email: 'mike@mike.com',
  fbUserId: '4Y7GGX',
  accessToken: '??',
  refreshToken: '??',
  tokenExpiresIn: '??',
};

var testPostChallenge = {
  userId: '999',
  buyInAmount: '12121',
  startDate: '2017-01-01T01:00:10.000Z',
  expirationDate: '2019-01-01T01:00:10.000Z',
  goalType: 'steps',
  goalAmount: '1000',
  userEtherWallet: '0xd7462515e62bb2d9d737e22fa7edba954a6dac03'
  // how do we deal with userEtherWallet, a new one is made upon docker-compose up
};
// insert User

beforeEach((done) => {
  db.sync({ force: true })
  .then(() => {
    User.destroy({})
    .then(() => User.create(testUser))
    .then(() => done());
  });
});

describe('/user/', () => {

  var user;

  beforeEach((done) => {
    request(app)
    .get('/user/1')
    .expect((res) => console.log(res), user = res.body)
    .end(done);
  });

  // ?????
  // afterEach(() => Room.destroy({ where: { hostId: 9999 } }));

  describe('User Creation /user/', () => {

    it('should return a name', (done) => {
      request(app)
      .get('/user/1')
      .expect(res.body.name).to.equal('Mike Bordelon')
      .done();
    });
  });
});



/////////////////////////////////////
// GET USER INFO
/////////////////////////////////////
// before((done) => {
//   db.sync({force: true})
//     .then(() => User.create(testUser))
//     .then(() => done());
// });


// describe('/user/', () => {

//   var fbUserId;

  // beforeEach((done) => {
  //   request(app)
  //   .get('/user/')
  //   .expect((res) => fbUserId = res.body.fbUserId)
  //   .end(done);
  // });

  // afterEach(() => User.destroy({ where: { fbUserId: fbUserId } }));

  // describe('Create a User in /user', () => {

  //   it('should create a entry in the database', () => {
  //     User.findOne({ where: { fbUserId: fbUserId } })
  //     .then((user) => expect(user).to.exist);
  //   });

  //   it('should contain a challengeId', (done) => {
  //     request(app)
  //     .post('/challenges')
  //     .send(testPostChallenge)
  //     .expect((res) => {
  //       challengeId = res.body.challengeId;
  //       expect(res.body.createdAt).to.equal(5);
  //     })
  //     .end(done);
  //   });
  //   it('should create a unique hash', () => {
  //     expect(hash1).to.exist;
  //     expect(hash2).to.exist;
  //     expect(hash1).to.not.equal(hash2);
  //   });
//   });

// });

///////////////////////////////////
// POST A CHALLENGE
// ///////////////////////////////////
// before((done) => {

//   db.sync({force: true})
//   .then(() => {
//     User.destroy({where: { id: 999 } })
//     .then(() => User.create(testUser1))
//     .then(() => done());
//   });
// });




//   var challengeId;

//   beforeEach((done) => {
//     request(app)
//     .post('/challenges/')
//     .send(testPostChallenge)
//     .expect((res) => challengeId = res.body.challengeId)
//     .end(done);
//   });

//   afterEach(() => Challenge.destroy({ where: { challengeId: challengeId } }));

//   describe('Create a Challenge /challenges', () => {

//     it('should create a entry in the database', () => {
//       User.findOne({ where: { userId: 999 } })
//       .then((user) => expect(user).to.exist);
//     });

//     it('should contain a challengeId', (done) => {
//       request(app)
//       .post('/challenges')
//       .send(testPostChallenge)
//       .expect((res) => {
//         challengeId = res.body.challengeId;
//         expect(res.body.createdAt).to.equal(5);
//       })
//       .end(done);
//     });
//     it('should create a unique hash', () => {
//       expect(hash1).to.exist;
//       expect(hash2).to.exist;
//       expect(hash1).to.not.equal(hash2);
//     });
//   });

//   describe('Room Joining /api/rooms/:pathUrl', () => {
//     describe('POST', () => {
//       it('should have user join the room', () => {});
//       it('', () => {});
//     });
//   });

//   describe('Room Status /api/room/status', () => {
//     it('', () => {});
//   });

// });

// describe('/api/users', () => {
//   beforeEach(() => {});
//   afterEach(() => {});

//   describe('All Users in Rooms /api/users/rooms/:userId', () => {
//     describe('GET', () => {
//       it('should return all users and rooms', () => {});
//     });
//   });

// });

// describe('/api/notes', () => {
//   beforeEach(() => {});
//   afterEach(() => {});

//   describe('Note Creation', () => {
//     describe('/api/notes/create', () => {
//       it('', () => {});
//       it('', () => {});
//     });
//   });
//   describe('Note Editing', () => {
//     describe('/api/notes/:userId/:roomId', () => {
//       it('', () => {});
//       it('', () => {});
//     });
//   });
// });

// describe('/api/audio', () => {
//   beforeEach(() => {});
//   afterEach(() => {});

//   describe('Audio Retrieval', () => {
//     describe('GET /api/audio/:pathUrl', () => {
//       it('', () => {});
//     });
//   });

