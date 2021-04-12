import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Listing from '../pages/Listing';
import BallotItems from '../pages/BallotItems';
import Donation from '../pages/Donation';
import Main from '../pages/Main'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import itemDetails from '../pages/ItemDetails'
import Logout from '../pages/Logout'
import MyItemStatus from '../pages/MyItemStatus'
import Approval from '../pages/Approval'
import ConfirmItemDonation from '../pages/ConfirmItemDonation'
import MyDonateItem from '../pages/MyDonateItem'
import ProfileUpdate from '../pages/ProfileUpdate'
import AdminItemDetails from '../pages/AdminItemDetails'
import {AdminRoute} from './AdminRoute'

class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/listing' component={Listing} />
        <Route path='/ballotItems' component={BallotItems} />
        <Route path='/donation' component={Donation} />
        <Route path='/signup' component={Signup} />
        <Route exact path='/profile/:userId' component={Profile} />
        <Route exact path='/profileUpdate' component={ProfileUpdate} />
        <Route path = '/itemDetails/:itemId' component = {itemDetails}/>
        <Route exact path = '/adminItemDetails/:itemId' component = {AdminItemDetails}/>
        <Route path = '/logout' component = {Logout}/>
        <Route path='/status' component={MyItemStatus} />
        <Route path='/mydonate' component={MyDonateItem} />
        <AdminRoute path='/approval' component={Approval} />
        <AdminRoute path='/confirmItemDonation' component={ConfirmItemDonation} />
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
