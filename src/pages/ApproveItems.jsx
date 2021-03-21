import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';
import {connect} from 'react-redux'
import { getAllUnapprovedItems, approveItem } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom';

class ApproveItems extends Component {

    constructor (props){
        super(props)
        this.handleApproveItem = this.handleApproveItem.bind(this)
    }

    componentDidMount(){
        this.props.getAllUnapprovedItems()
        // this.props.item.forEach(element => {
        //     console.log(element)
        // });
    }
    
    handleApproveItem(itemId){
        //Need to find how to load the page dynamically
        this.props.approveItem(itemId)
        this.props.getAllUnapprovedItems()
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div>
                            <h1>getAllUnapprovedItems</h1>
                            {this.props.item.map(item => (
                           <h1 key = {item.itemId}>
                               {item.itemName}
                               <button onClick = {() => {this.handleApproveItem(item.itemId)}}>approve item</button>
                            </h1>
                            ))
                            }
                            </div>
                        {/*<PendingItems/>*/}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
const mapStateToProps = state => {
    return {
        item : state.item.items,
        ui : state.ui
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getAllUnapprovedItems, approveItem}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(ApproveItems)