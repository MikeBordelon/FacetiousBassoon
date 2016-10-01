import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

const style = {
  height: '200px',
  width: '600px',
  margin: '100px 20px 20px 340px',
  textAlign: 'center',
  display: 'center'
};

const About = function (props) {
  // console.log(props);
  return (
    <div>
    <Paper style={style} zDepth={1}>
      <h1>About us</h1>
        <div>
          <p>
            Lorem Ipsum er rett og slett dummytekst fra og for trykkeindustrien.
            Lorem Ipsum har vært bransjens standard for dummytekst helt siden
            1500-tallet, da en ukjent boktrykker stokket en mengde bokstaver for å
            lage et prøveeksemplar av en bok. Lorem Ipsum har tålt tidens tann
            usedvanlig godt, og har i tillegg til å bestå gjennom fem århundrer
            tålt spranget over til elektronisk typografi uten vesentlige endringer.
            Lorem Ipsum ble gjort allment kjent i 1960-årene ved lanseringen av
            Letraset-ark med avsnitt fra Lorem Ipsum, og senere med sideom
            brekkingsprogrammet Aldus PageMaker som tok i bruk nettopp Lorem Ipsum for
            dummytekst.
          </p>
        </div>
     </Paper>
    </div>
  );
};

export default About;