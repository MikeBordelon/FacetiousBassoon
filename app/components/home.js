import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: '200px',
  width: '600px',
  margin: '20px 20px 20px 300px',
  textAlign: 'center',
  display: 'center',
};

const Home = React.createClass({
  render: function() {
    return (
      <div>
        <Paper style={style} zDepth={1}>
        <h1>Welcome To FitCoin</h1>
        <p>Bet on your fitness with FitCoin! It's easy! Just setup a new challenge for yourself
         and we will track all of your details in order to make sure you completed the challenge. If you successfully complete
         a challenge you can keep your Ether, but if you fail the challenge we will donate the ether
         to The Dust in Panty Ladies Charity.</p>
         </Paper>
      </div>
    );
  }
});

export default Home;


