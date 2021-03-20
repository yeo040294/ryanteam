import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';
import {connect} from 'react-redux'
import { getAllUnapprovedItems } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'

class UnapprovedItems extends Component {

    componentDidMount(){
        this.props.getAllUnapprovedItems()
        this.props.item.forEach(element => {
            console.log(element)
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div><h1>getAllUnapprovedItems</h1></div>
                        <PendingItems/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
const mapStateToProps = state => {
    return {
        // Assigning the state properties into our propname
        // propname  :  state.somefield
        item : state.item.items
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getAllUnapprovedItems}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(UnapprovedItems)