import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation ,MDBBtn, MDBInput} from "mdbreact";
import Approve from '../components/ApprovalPage/Approve'
import AdminNavBar from '../components/AdminNavBar'
import Footer from '../components/AdminFooter'
import {clearMessage} from '../Redux/Actions/uiAction'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { approveItem, addRequest, rejectItem } from '../Redux/Actions/itemAction'
import Message from '../components/Message'

class Approval extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: localStorage.getItem("username"),
            usertype: localStorage.getItem("usertype"),
            itemList: [],
            searchResult: [],
            searchDisplay : false
        }
    }

    componentDidMount(){
        this.props.clearMessage()
    }
    
    approveItem = (itemid) => {
        this.props.approveItem(itemid);
    }

    rejectItem = (itemid) => {
        this.props.rejectItem(itemid)
    }

    Navigate = (itemId) => {
        this.props.history.push("/adminItemDetails/" + itemId)
    }

    togglePopup = () => {
        this.props.clearMessage()
        this.searchitem()
      }
    
      handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    
    onKeyPress = (e) => {
        //add func to if search is '', show everything
        this.searchitem()
    }
    
    searchitem = () => {
       //var search = this.props.collectionRefList.filter(x => x.userHandle.toLowerCase().includes(this.state.search))
       var search = this.props.itemlist.filter(x => x.userHandle.toLowerCase().includes(this.state.search))
        this.setState({ 
            searchResult: search, 
            searchDisplay: true 
        })
    }

    GoBack = () => { this.props.history.push("/") }
    render() {
        return (
            <div>
                <AdminNavBar />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                        {this.props.ui.newMessage ? 
                        <Message    content = {this.props.ui.message.message}
                                    handleClose = {this.togglePopup}
                                    buttonText = "Ok" /> : null}
                        <br />
                                <h2>Donation Approval</h2>
                            <h6>Enter a user handle to find their item...</h6>
                            
                            <MDBInput id="search" onChange={this.handleChange} onKeyDown={this.onKeyPress} value={this.state.search} label="Search" />

                            <MDBAnimation type='slideInUp'>
                               
                                <hr />
                                {this.state.searchResult.length == 0 ? 
                                <div>
                                {this.state.searchDisplay && <h6>No search result found..</h6>}
                                <Approve navigate={this.Navigate} myRequest={this.props.itemlist} toapprove={this.approveItem} toreject = {this.rejectItem} /></div>
                                : 
                                <Approve navigate={this.Navigate} myRequest={this.state.searchResult} toapprove={this.approveItem} toreject = {this.rejectItem} />
                                }
                                </MDBAnimation>
                           
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <br />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ui : state.ui,
        itemlist: state.firestore.ordered.items,
    }
}
export default compose(connect(mapStateToProps, { approveItem, addRequest, rejectItem, clearMessage }), firestoreConnect([{ collection: 'items' }]))(Approval)