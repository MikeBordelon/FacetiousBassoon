import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserProfile from '../components/user-profile';
import store from '../store';
import { getFriendsChallenges } from '../actions/user-actions';

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    // axios.get('https://www.googleapis.com/books/v1/volumes?', {
    //   params: {
    //     q: 'Pot'
    //   }
    // })
    // .then(response => {
    var dummyData2 = [
      {
        id: 1523523424,
        challengeType: 'steps',
        challengeGoal: 100000,
        challengeCurrent: 43242,
        creationDate: Date.now() - 100000000,
        expirationDate: Date.now() + 1000000000,
        status: 'active'
      },
      {
        id: 1523523423,
        challengeType: 'floors',
        challengeGoal: 720,
        challengeCurrent: 719,
        creationDate: Date.now() - 1000000000,
        expirationDate: Date.now() - 10000000,
        status: 'failed'
      }
    ];
    store.dispatch(getFriendsChallenges(dummyData2));
    //   return response.data.items;
    // });
  }

  render () {
    // console.log(store)


    // const profile = this.props.store.userState.profile;
    // const friendsChallenges = this.props.store.userState.friendsChallenges;
    return (
      <UserProfile profile={this.props.profile}
                   friendsChallenges={this.props.friendsChallenges}
      />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    store,
    profile: store.userState.profile,
    friendsChallenges: store.userState.friendsChallenges
  };
};

export default connect(mapStateToProps)(UserProfileContainer);
