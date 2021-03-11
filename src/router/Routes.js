import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/LoginPage';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Listing from '../pages/Listing';
import Admin from '../pages/Admin';
import Donation from '../pages/Donation';
import Main from '../pages/Main'
import Signup from '../pages/Signup'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/listing' component={Listing} />
        <Route path='/admin' component={Admin} />
        <Route path='/donation' component={Donation} />
        <Route path='/main' component={Main} />
        <Route path='/signup' component={Signup} />
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
