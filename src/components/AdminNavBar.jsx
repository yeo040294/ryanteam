import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBFooter, MDBNavLink, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';


class AdminNavBar extends Component {
    state = {
        collapseID: '',
        username: localStorage.getItem("username")
    };
    componentDidMount(){
        if(!this.state.username)
            this.props.navigate()
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    closeCollapse = collID => () => {
        const { collapseID } = this.state;
        window.scrollTo(0, 0);
        collapseID === collID && this.setState({ collapseID: '' });
    };

    render() {
        const { collapseID } = this.state;
        const overlay = (
            <div
              id='sidenav-overlay'
              style={{ backgroundColor: 'transparent' }}
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
          );
        
        return (
            <div>
                <MDBNavbar color='rgba-purple-strong' dark expand='md' fixed='top' scrolling>
                    <MDBNavbarBrand href='/approval' className='py-0 font-weight-bold'>
                        <MDBIcon fab icon="gratipay" style={{ height: '1.5rem', width: '1.5rem' }} />
                        <strong className='align-middle'>SecondLove</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        onClick={this.toggleCollapse('mainNavbarCollapse')}
                    />
                    <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                    to='/approval'
                                    >
                                        <strong>Approval</strong>
                                    </MDBNavLink>
                                </MDBNavItem>

                                <MDBNavItem>
                                <MDBNavLink
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                    to='/confirmItemDonation'
                                    >
                                        <strong>Confirm Collection</strong>
                                    </MDBNavLink>
                                </MDBNavItem>
    
                                <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                    <strong>{ localStorage.getItem("userhandle")}</strong>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">                                        
                                     <MDBDropdownItem href='/logout'>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        )
    }
}
export default AdminNavBar