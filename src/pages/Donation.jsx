import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { Component } from 'react'
import GoogleMap from '../components/GoogleMap'
import ItemText from '../components/ItemText'
import Uploadfile from '../components/Uploadfile'

class Donation extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div>
                            <h3>Upload Images</h3>
                            <img src='data:image/jpeg;base64,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'
                                width='200' height='200' className="img-fluid" alt="item image"></img>
                            <Uploadfile />
                            <ItemText/>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <h3>Map Location</h3>
                        {/* <GoogleMap /> */}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        )
    }
}
export default Donation