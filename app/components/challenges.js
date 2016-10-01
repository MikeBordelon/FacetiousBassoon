import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const style = {
  paper: {
    height: 60,
    width: 238,
    margin: '0 0 20px 500px'
  },


  text: {
    margin: '0 0 20px 500px'
  },

  h3: {
    display: 'flex'
    // textAlign: 'center',
    // verticalAlign: 'middle',
    // margin: '0px 0px 0px 0px'

  },

  h4: {
    // display: 'inline-block',
    width: 400,
    margin: '0 0 0 0'

  },

  button: {
    display: 'inline-block',
    height: 30,
    width: 80,
    margin: '10px 0px 0px 80px'
  },
  tableCNT: {
    textAlign: 'center'
  },
  tableRGT: {
    margin: '0px 500px 0px 0px'
  },

  paper: {
    height: '50px',
    width: '500px',
    margin: '90px 0px 50px 340px',

  }
};


// const style = {
  // height: '200px',
  // width: '600px',
  // margin: '100px 20px 20px 340px',
  // textAlign: 'center',
  // display: 'center'
// };

export default function (props) {
  // console.log(props);
  return (

    <div>
    <Paper style={style.paper} zDepth={1}>
      <h3 style={style.h3}>Your current challenges</h3>
    </Paper>

      <table className="table">
        <thead className="thead-inverse">
            <th >Author</th>
            <th style={style.tableCNT}>Title</th>
            <th style={style.tableRGT}>Pages</th>
        </thead>
      </table>

      {props.challenges.map((challenge, index) => {

        return (
          <div key={index}>
            <table className="table">
              <tbody>
                <tr >
                  <td >{challenge.volumeInfo.authors[0]}</td>
                  <td style={style.tableCNT}>{challenge.volumeInfo.title}</td>
                  <td>{challenge.volumeInfo.pageCount}</td>
                  <td href="#" className="btn btn-xs btn-danger"><span className="glyphicon glyphicon-remove-sign" ></span> Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}


      // <Paper style={style.paper} zDepth={1}>
      //   <span><h4 style={style.h4}>Walk 10,000 steps in one day</h4></span>
      //   <span style={style.button}href="#" className="btn btn-primary btn-warning"><span className="glyphicon glyphicon-flash"></span> GO!</span>
      // </Paper>