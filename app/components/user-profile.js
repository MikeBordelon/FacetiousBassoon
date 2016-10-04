import React from 'react';

const Profile = function(props) {
  console.log(props);
  return (
    <div className="user-profile">
      <div className="details">
        <h3>Name: {props.profile.name}</h3>
        <h3>Age: {props.profile.age}</h3>
        <h3>Points: {props.profile.wallet}</h3>

      </div>
    </div>
  );
};

export default Profile;
