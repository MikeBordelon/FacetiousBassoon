import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
var expect = require('chai').expect; // You can use any testing library
import { getChallengesSuccess } from '../../app/actions/user-actions.js';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

var testChallenge = {
  userId: '999',
  buyInAmount: '12121',
  startDate: '2017-01-01T01:00:10.000Z',
  expirationDate: '2019-01-01T01:00:10.000Z',
  goalType: 'steps',
  goalAmount: '1000',
  userEtherWallet: '0xd7462515e62bb2d9d737e22fa7edba954a6dac03'
  // how do we deal with userEtherWallet, a new one is made upon docker-compose up
};

describe('async actions', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('creates GET_CHALLENGES_SUCCESS when fetching challenges has been done', () => {
    nock('http://localhost:3000')
      .get('/user/1')
      .reply(200, {
        body: {
          challenges: {
            data: {
              challenges: []
            }
          }
          ,
        },
      });

    const expectedActions = [
      { type: 'GET_CHALLENGES_SUCCESS',
        challenges: testChallenge
      },
      // { type: types.FETCH_TODOS_SUCCESS, body: { events: ['do something']  } }
    ];
    const store = mockStore({
      challenges: []
    });


    return store.dispatch(getChallengesSuccess(challenges))
      .then(() => {
        const result = store.getActions();
        return expect(result[result.length - 2].type).toEqual(expectedActions.type);
      });
  });
});