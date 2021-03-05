import React, { Component } from 'react'
import Picture from '../components/Picture'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"

class Search extends Component {
    render() {
        return (
            <MDBContainer>
                 <h1>Searching for "Item"</h1>
                        <h3>XXX Listings found near you</h3>
                <MDBRow>
                
                    <MDBCol lg = "4">
                   
                        
                    <Picture/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
                
               
            
        )
    }
}
export default Search