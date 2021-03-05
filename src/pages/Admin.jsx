import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PendingItems from '../components/PendingItems';


class Admin extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <PendingItems/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}
export default Admin