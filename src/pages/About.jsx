import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Login from '../components/Login'

class About extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h1>Welcome, User!</h1>
                    <Login/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            
                
            
        )
    }
}
export default About