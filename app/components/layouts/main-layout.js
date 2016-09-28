import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  display: 'inline-block',
  margin: '0px 0px 0px 1160px',
  height: '100px',
  width: '100px'
};

export default function(props) {
  return (
    <div>
      <Paper style={style}>
        <Menu>
          <MenuItem containerElement={<Link to='/' />} primaryText='Home'/>
          <MenuItem containerElement={<Link to='/profile' />} primaryText='Profile' />
        </Menu>
      </Paper>
      <main>
        {props.children}
      </main>
    </div>
    );
}


// <MenuItem containerElement={<Link to="/" />} primaryText="Home" />
// <MenuItem containerElement={<Link to="/profile" />} primaryText="Profile" />