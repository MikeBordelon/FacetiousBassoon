import React from 'react';
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';

// Layouts
import MainNavBar from './components/layouts/main-navbar';
// import SearchLayoutContainer from './components/containers/search-layout-container';

// Pages
import Home from './components/home';
import About from './components/views/about';
import UserListContainer from './components/containers/user-list-container';
import OpenCVContainer from './components/containers/OpenCV-container';
// import WidgetListContainer from './components/containers/widget-list-container';
// import TodoListContainer from './components/containers/todo-list-container';
// import StaticContainer from './components/containers/static-container';

export default (
  <Router history={browserHistory}>
    <Route component={MainNavBar}>
      <Route path='/' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/profile' component={UserListContainer}/>
      <Route path='/openCV' component={OpenCVContainer}/>
    </Route>
  </Router>
);
