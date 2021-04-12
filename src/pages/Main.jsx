import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBAnimation } from 'mdbreact'
import Card from '../components/Main/Card'
import CategoriesBtn from '../components/Main/CategoriesBtn'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { firestoreConnect } from 'react-redux-firebase'

class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
            FilteredPosts: '',
            username: localStorage.getItem("username"),
            usertype: localStorage.getItem("usertype"),
            currentItemList: [],
            selectedCat : false,
            searchKeyword: '',
            searchResult: [],
            selectedSearch : false,
            expandSearch : false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    validateLogin = () => {
        this.props.history.push('/logout')
    }
    onKeyPress = (e) => {
        this.searchitem()
    }
    searchitem = () => {
        console.log(this.state)
        if(this.state.searchKeyword == ''){
            this.setState({
                selectedSearch : false
            })
        }
        if(this.state.selectedCat){
            let search = this.state.currentItemList.filter(x => x.itemStatus == "Approved" && x.itemName.toLowerCase().includes(this.state.searchKeyword))
            this.setState({ 
                searchResult: search, 
                selectedSearch: true
             })
        }
        else{
            let search = this.props.itemlist.filter(x => x.itemStatus == "Approved" && x.itemName.toLowerCase().includes(this.state.searchKeyword))
            this.setState({ 
                searchResult: search, 
                selectedSearch: true
             })
        }
    }
    Navigate = (itemID) => {
        this.props.history.push("/itemDetails/" + itemID)
    }

    handleCategoryChange = (categoryId)=> {
        console.log("this is the catId : " + categoryId)
        this.setState({
            selectedSearch : false
        })

        if(categoryId != 'Any'){
            const categoryArr = this.props.itemlist.filter(x => x.category == categoryId && x.itemStatus == "Approved")
            this.setState((prevState) => ({
                ...prevState,
                searchKeyword : '',
                currentItemList : categoryArr,
                selectedCat : true
            }))
        }
        else{
            this.setState((prevState) => ({
                ...prevState,
                searchKeyword : '',
                currentItemList : this.props.itemlist,
                selectedCat : false
            }))
        }
        console.log(this.state)
    }

    handleExpandSearch = (e) => {
        e.preventDefault()
        this.setState((prevState)=>({
            expandSearch : !prevState.expandSearch
        }))
    }



    render() {
        let PopularListing;
        if (this.props.itemlist)
            PopularListing = this.props.itemlist.filter(x => x.itemStatus == "Approved").map(x => 
            <MDBCol size="4"> 
            <Card viewItem={this.Navigate} post={x} />
             </MDBCol>)
        return (
            <div>
                <Navbar navigate={this.validateLogin} />
                <br />
                <MDBContainer>
                    <MDBAnimation type="slideInLeft" duration='1s'>
                        <MDBRow>
                            <MDBCol md = '10'></MDBCol>
                            <MDBBtn onClick = {this.handleExpandSearch}
                                    color = 'pink'>Toggle search</MDBBtn>
                        </MDBRow>
                        
                        {this.state.expandSearch && 
                        <div>
                            <h3>Search item</h3>
                        <MDBInput id="searchKeyword" 
                        onChange={this.handleChange} 
                        onKeyDown={this.onKeyPress} 
                        value={this.state.searchKeyword} 
                        label="Enter the item name here..." />
                        </div>
                        }
                        <MDBRow>
                                <MDBCol>
                                    {this.state.expandSearch &&
                                    <div>
                                    <h3> Categories </h3>
                                    <hr/>
                                    <CategoriesBtn posts={this.handleCategoryChange}></CategoriesBtn>
                                    <br /><br /><br />
                                    </div>
                                    }
                                    
                                    <h3>Items available in SecondLove</h3>
                                    
                                    <MDBRow>
                                        {/**If user selected category*/}
                                        {this.state.selectedCat &&
                                        !this.state.selectedSearch && this.state.currentItemList.map(x => {
                                            console.log(this.state)
                                            return (
                                                <MDBCol size="4">
                                                    <Card post={x} viewItem={this.Navigate} />
                                                </MDBCol>
                                            )
            
                                        })
                                        }
                                        {this.state.selectedCat &&
                                        !this.state.selectedSearch && this.state.currentItemList.length==0
                                        && <div><br /><br /><h6>No results found.</h6></div>}
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        <MDBRow>
                            {/**If user selected category AND search keyword*/}
                            {this.state.selectedCat && this.state.selectedSearch && this.state.searchResult.map(x => {
                                return (
                                    <MDBCol size="4">
                                        <Card viewItem={this.Navigate} post={x} />
                                    </MDBCol>
                                )
                            })}
                            {this.state.selectedCat &&
                                        this.state.selectedSearch && this.state.searchResult.length==0
                                        && <div><br /><br /><h6>No results found.</h6></div>}

                            {/**If user select only search keyword */}
                            {this.state.selectedSearch && !this.state.selectedCat &&
                            this.state.searchResult.map(x => {
                                return (
                                    <MDBCol size="4">
                                        <Card viewItem={this.Navigate} post={x} />
                                    </MDBCol>
                                )
                            })
                            }
                            {!this.state.selectedCat &&
                                        this.state.selectedSearch && this.state.searchResult.length==0
                                        && <div><br /><br /><h6>No results found.</h6></div>}                                

                            <br/>
                            <br/>
                            {/**if user only did not search keyword or category */}
                        </MDBRow>
                        {!this.state.selectedSearch && !this.state.selectedCat &&
                            <MDBRow>
                                <MDBCol>
                                    <hr/>
                                    <MDBRow>
                                        {PopularListing}
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        }
                        <br />
                        <br />


                    </MDBAnimation>
                </MDBContainer>
                <Footer />
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        itemlist: state.firestore.ordered.items
    }
}


//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        { collection: 'items'}, {collection: 'collectionReference'}
    ]))(Main)