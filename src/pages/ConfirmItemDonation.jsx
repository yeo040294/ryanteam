import { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getCollectionReference, rejectItemCollection, confirmItemCollection} from '../Redux/Actions/itemAction'
import {clearMessage} from '../Redux/Actions/uiAction'
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon, MDBAnimation, MDBInput } from "mdbreact";
import { firestoreConnect } from 'react-redux-firebase'
import AdminNavBar from '../components/AdminNavBar'
import Footer from '../components/AdminFooter'
import Message from '../components/Message'
import ConfirmItemTable from "../components/ConfirmItemTable";

class ConfirmItemDonation extends Component {

constructor(props){
    super(props)
    this.state = {
        search: '',
        searchResult: [],
        searchDisplay: true
    }
}
Navigate = (itemId) => {
    this.props.history.push("/adminItemDetails/" + itemId)
}

componentDidMount(){
    this.props.getCollectionReference()
    this.props.clearMessage()
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
   var search = this.props.item.listOfCollectionRefs.filter(x => x.userHandle.toLowerCase().includes(this.state.search))
    this.setState({ searchResult: search, searchDisplay: false })
}

render(){
    {console.log(this.props.item.listOfCollectionRefs)}
    return(
        <div>
        <AdminNavBar />
        <MDBContainer>

            <MDBRow>
                <MDBCol>
                    {this.props.ui.newMessage ? 
                    <Message    content = {this.props.ui.message.message}
                                 handleClose = {this.togglePopup}
                                 buttonText = "Ok" /> : null}
                    <div>
                        <br />
                        <h3>Items Reservations</h3>
                        <MDBAnimation type="slideInLeft" duration='1s'>
                            {/**Search bar */}
                            
                            <h6>Enter a user handle to find their collection reference...</h6>
                            
                            <MDBInput id="search" onChange={this.handleChange} onKeyDown={this.onKeyPress} value={this.state.search} label="Search" />

                                {this.state.searchResult.length !== 0 &&
                                <ConfirmItemTable navigate={this.Navigate} myRequest={this.state.searchResult} toConfirm={this.props.confirmItemCollection} toReject= {this.props.rejectItemCollection} refresh = {this.searchitem}/>
         
                                
                                }
                                {this.state.searchResult.length == 0 &&
                                <div>
                                    <h6>No results found</h6>
                                    <ConfirmItemTable navigate={this.Navigate} myRequest={this.props.item.listOfCollectionRefs} toConfirm={this.props.confirmItemCollection} toReject= {this.props.rejectItemCollection} refresh = {this.searchitem}/>
                                </div>
                                 }
                      
                        
                        </MDBAnimation>
                    </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footer />
            </div>
    )
    
}

}

const mapStateToProps = state => {
    return {
        ui : state.ui,
        item  : state.item,
        collectionRefList : state.firestore.ordered.collectionReference
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {getCollectionReference, rejectItemCollection, confirmItemCollection, clearMessage}
  , dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{ collection: 'collectionReference' }]))(ConfirmItemDonation)