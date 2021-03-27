import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';

import { connect } from 'react-redux'
import { getAllUnapprovedItems, approveItem, disapproveItem } from '../Redux/Actions/itemAction'
import { getUserData } from '../Redux/Actions/userAction';
import { bindActionCreators } from 'redux'

class ApproveItems extends Component {

    constructor(props) {
        super(props)
        this.handleApproveItem = this.handleApproveItem.bind(this)
        this.state = {
            loading: false}
    }

    // isLoading() {
    //     document.getElementById("demo").style.cursor = "wait";
    // }

    componentDidMount() {
        this.props.getUserData()
        console.log("userData:", this.props.user.credentials)
        this.props.getAllUnapprovedItems()
        localStorage.setItem('unapprovedItem', JSON.stringify(this.props.unapproveditem));
        console.log("approval items: ",this.props.unapproveditem)
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

    handleApprove(itemId){
        this.props.approveItem(itemId)
    }

    handleReject(itemId){
        this.props.disapproveItem(itemId)
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                    <div>
                        <h3>Pending Approval</h3>
                        <hr/>
                        <MDBTable striped>
                            <MDBTableHead>
                                <tr>
                                    <th>Picture</th>
                                    <th>Item name and description</th>
                                    <th>Location</th>
                                    <th>Approve/Reject</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {/**display pending approval items here*/}
                                {
                                    this.props.unapproveditem.map((eachItem) => {
                                         return (
                                            <tr>
                                                <td><img src={eachItem.imageUrl}
                                                    width='200' height='200' className="img-fluid" alt="item image"></img></td>
                                                <td><p><div>Item name: {eachItem.itemName}</div></p>
                                                     <div>Item condition: {eachItem.itemCondition}</div></td>
                                                <td>{eachItem.location}</td>
                                                <td>
                                                    <MDBBtn color="success" onClick={() =>this.handleApprove(eachItem.itemId)}>
                                                        <MDBIcon icon="check" className="mr-1" /> Approve
                                                                            </MDBBtn>
                                                    <MDBBtn color="danger" onClick={() =>this.handleReject(eachItem.itemId)}>
                                                        <MDBIcon icon="times" className="mr-1" />Reject
                                                                            </MDBBtn></td>
                                            </tr>
                                        )
                                    })
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </div>

                        {/**
                         * {this.state.loading && 
                            <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                          </div>}
                        {!this.state.loading && <PendingItems item={this.props.unapproveditem} approve={this.handleApproveItem} />}
                         */}
                        

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
const mapStateToProps = state => {
    return {
        unapproveditem: state.item.items,
        ui: state.ui,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    { getAllUnapprovedItems, approveItem, getUserData, disapproveItem }
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApproveItems)