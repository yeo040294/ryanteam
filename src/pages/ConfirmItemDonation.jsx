import { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getCollectionReference, rejectItemCollection, confirmItemCollection} from '../Redux/Actions/itemAction'
import {clearMessage} from '../Redux/Actions/uiAction'
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import { firestoreConnect } from 'react-redux-firebase'
import AdminNavBar from '../components/AdminNavBar'
import Message from '../components/Message'

class ConfirmItemDonation extends Component {

componentDidMount(){
    this.props.getCollectionReference()
    this.props.clearMessage()
}

handleConfirmItemCollection(itemId){
    this.props.confirmItemCollection(itemId)
}
handleRejectItemCollection(itemId){
    this.props.rejectItemCollection(itemId)
}

togglePopup = () => {
    this.props.clearMessage()
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
                        <h3>Confirm / Undo reservations</h3>
                        <hr />
                        <MDBTable striped>
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
        item  :state.item
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {getCollectionReference, rejectItemCollection, confirmItemCollection, clearMessage}
  , dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{ collection: 'items' }]))(ConfirmItemDonation)