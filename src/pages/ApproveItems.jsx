import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';

import { connect } from 'react-redux'
import { getAllUnapprovedItems, approveItem } from '../Redux/Actions/itemAction'
import { getUserData } from '../Redux/Actions/userAction';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

class ApproveItems extends Component {

    constructor(props) {
        super(props)
        this.handleApproveItem = this.handleApproveItem.bind(this)
        this.state = {
            loading: false}
    }

    isLoading() {
        document.getElementById("demo").style.cursor = "wait";
    }

    componentDidMount() {
        this.props.getUserData()
        console.log(this.props.user.credentials)
        this.props.getAllUnapprovedItems()
        localStorage.setItem('unapprovedItem', JSON.stringify(this.props.item));
        console.log(this.props.item)
        // this.props.item.forEach(element => {
        //     console.log(element)
        // });
    }

    handleApproveItem(itemId) {
        //Need to find how to load the page dynamically
        if (this.props.user.credentials.isAdmin) {
            this.props.approveItem(itemId)
            this.props.getAllUnapprovedItems()
        }
        else {
            alert("Unauthorised. Please login as admin first.")
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        {this.state.loading && 
                            <div > Loading...
                            </div>}
                        {!this.state.loading && <PendingItems item={this.props.item} approve={this.handleApproveItem} />}

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
const mapStateToProps = state => {
    return {
        item: state.item.items,
        ui: state.ui,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    { getAllUnapprovedItems, approveItem, getUserData }
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(ApproveItems)