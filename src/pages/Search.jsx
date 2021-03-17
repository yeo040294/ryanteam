import React, { Component } from 'react'
import Picture from '../components/Picture'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"


class Search extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                <form id="searchQuery" action="/action_page.php">
                    <input type="text" name="query" placeholder="search SecondLove"></input>
                    <input type="button" onclick="myFunction()" value="Search"></input>
                </form>
                </MDBRow>
                 <h1>Searching for </h1>
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