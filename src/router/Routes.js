import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Search from '../pages/Search';
import Listing from '../pages/Listing';
import UnapprovedItems from '../pages/UnapprovedItems';
import UnballotItems from '../pages/UnballotItems.jsx';
import Donation from '../pages/Donation';
import Main from '../pages/Main'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import itemDetails from '../pages/ItemDetails'

class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/listing' component={Listing} />
        <Route exact path='/admin/UnapprovedItems' component={UnapprovedItems} />
        <Route exact path='/admin/UnballotItems' component={UnballotItems} />
        <Route path='/donation' component={Donation} />
        <Route path='/signup' component={Signup} />
        <Route path='/profile' component={Profile} />
        <Route path = '/itemDetails/:itemId' component = {itemDetails}/>
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
