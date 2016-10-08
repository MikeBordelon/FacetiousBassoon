import React from 'react';
import AppBar2 from '../components/app-bar.js';


const MainNavBar = (props) => {

  return (
    <div>
    <AppBar2/>
        {props.children}
    </div>
  );
};


export default MainNavBar;
