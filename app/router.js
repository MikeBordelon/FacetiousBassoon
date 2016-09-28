import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
// import SearchLayoutContainer from './components/containers/search-layout-container';

// Pages
import Home from './components/home';
import UserListContainer from './components/containers/user-list-container';
import UserProfileContainer from './components/containers/user-profile-container';
// import WidgetListContainer from './components/containers/widget-list-container';
// import TodoListContainer from './components/containers/todo-list-container';
// import StaticContainer from './components/containers/static-container';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home}/>

      <Route path='profile'>
        <IndexRoute component={UserListContainer}/>
      </Route>

    </Route>
  </Router>
);
