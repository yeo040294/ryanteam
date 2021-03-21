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
            query : 'iphone',
            location : 'cash converters',
            itemCondition : 'well used'
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
                <button onClick = { () => {this.handleSearch()}}>click here to search</button>
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