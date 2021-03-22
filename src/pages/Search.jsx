import React, { Component } from 'react'
import Picture from '../components/Picture'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { searchItems } from '../Redux/Actions/itemAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class Search extends Component {

    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(){
        const searchData ={
            //keyword
            //Values : string or ''
            //Description : '' if user entered no keywords
            keyword : '',
            //allowBallotItems
            //Values : True or false
            //Description : True to display items that are waiting to be ballot / already donated
            allowBallotItems : false,
            //location
            //Values : string or ''
            //Description : '' if user entered no location
            location : '',
            //itemCondition
            //Values : 'New | SlightlyUsed | WellUsed' or '' 
            //Description : '' if user entered nothing for itemCondition
            itemCondition : 'WellUsed'
        }

        this.props.searchItems(searchData, this.props.history)
    }


    render() {
        return (
            <MDBContainer>
                <MDBRow>
                <form id="searchQuery" action="/action_page.php">
                    <input type="text" name="query" placeholder="search SecondLove"></input>
                    <input type="button" onclick="myFunction()" value="Search"></input>
                </form>
                </MDBRow>
                <button onClick = { () => {this.handleSearch()}}>click here to search (hard coded in search.jsx)</button>
                 <h1>Searching for </h1>
                 {this.props.item.map(item => (
                           <h1 key = {item.itemId}>
                               <Link to = {`/itemDetails/${item.itemId}`}>{item.itemName}</Link>
                               </h1>
                        ))
                        }
                <MDBRow>
                
                    <MDBCol lg = "4">
                   
                        
                    <Picture/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
                
               
            
        )
    }
}
const mapStateToProps = state => {
    return {
        item : state.item.items
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {searchItems}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(Search)