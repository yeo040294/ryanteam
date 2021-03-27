import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBFooter, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './router/Routes';
import Store from './Redux/Store/Store';
import { Provider } from 'react-redux';
import Navbar from './components/NavBar'
import AdminNavbar from './components/AdminNavbar'
import UserNavbar from './components/UserNavbar'
import GuestNavbar from './components/GuestNavbar'
import {connect} from 'react-redux'
import History from './components/History'

class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <Router history = {History}>
        {/**< Navbar />  :=D */}
          {this.props.user.authenticated &&
           this.props.user.isAdmin && <AdminNavbar/>}
          {this.props.user.authenticated &&
          !this.props.user.isAdmin && <UserNavbar />}
          {!this.props.user.authenticated && <GuestNavbar />}
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
      item : state.item.items,
      user : state.user
  }
}
export default connect(mapStateToProps)(App)

