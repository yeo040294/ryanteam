import { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getCollectionReference, rejectItemCollection, confirmItemCollection} from '../Redux/Actions/itemAction'
import {clearMessage} from '../Redux/Actions/uiAction'
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon, MDBAnimation, MDBInput } from "mdbreact";
import { firestoreConnect } from 'react-redux-firebase'
import AdminNavBar from '../components/AdminNavBar'
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
componentDidMount(){
    this.props.getCollectionReference()
    this.props.clearMessage()
}

handleConfirmItemCollection(itemId){
    this.props.confirmItemCollection(itemId)
    this.searchitem()
}
handleRejectItemCollection(itemId){
    this.props.rejectItemCollection(itemId)
    this.searchitem()
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
                        <h3>Confirm / Undo reservations</h3>
                        <hr />

                        <MDBAnimation type="slideInLeft" duration='1s'>
                            {/**Search bar */}
                            
                            <h6>Enter a user handle to find their collection reference...</h6>
                            
                            <MDBInput id="search" onChange={this.handleChange} onKeyDown={this.onKeyPress} value={this.state.search} label="Search" />

                                {this.state.searchResult.length !== 0 &&
                                <ConfirmItemTable myRequest={this.state.searchResult} toConfirm={this.state.handleConfirmItemCollection} toReject= {this.state.handleRejectItemCollection} />
         
                                
                                }
                                {this.state.searchResult.length == 0 &&
                                <div>
                                    <h6>No results found</h6>
                                    <ConfirmItemTable myRequest={this.props.item.listOfCollectionRefs} toConfirm={this.state.handleConfirmItemCollection} toReject= {this.state.handleRejectItemCollection} />
                                </div>
                                 }
                        {/**
                         * 
                         * <MDBTable striped>
                            <MDBTableHead>
                                <tr>
                                    <th>UserId</th>
                                    <th>ItemId</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {this.props.item.listOfCollectionRefs.map((eachRef => {
                                    return (          
                                        <tr key = {eachRef.itemId}>
                                        <td>{eachRef.userId}</td>
                                        <td>{eachRef.itemId}</td>
                                        <td>{eachRef.createdAt}</td>
                                        <td>{eachRef.status}</td>
                                        <MDBBtn color="success" onClick={() => this.handleConfirmItemCollection(eachRef.itemId)}>
                                        <MDBIcon icon="check" className="mr-1" /> Confirm Donation</MDBBtn>
                                        <MDBBtn color="danger" onClick={() => this.handleRejectItemCollection(eachRef.itemId)}>
                                        <MDBIcon icon="times" className="mr-1" /> Undo reservation</MDBBtn>                      
                                        </tr>
                                    )
                                    }))}
                            </MDBTableBody>
                        </MDBTable>
                         * 
                         */}
                        
                        </MDBAnimation>
                    </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
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