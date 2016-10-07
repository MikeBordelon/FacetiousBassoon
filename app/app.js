import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import {blue700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blue700,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      {router}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
