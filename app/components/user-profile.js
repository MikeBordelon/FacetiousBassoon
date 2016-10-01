import React from 'react';

export default function(props) {
  return (
    <div className="user-profile">
      <div className="details">
        <h1>{props.name}</h1>
      </div>
    </div>
  );
}
