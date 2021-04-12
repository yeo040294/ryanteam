import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AdminNavBar from '../components/AdminNavBar'
import Footer from '../components/Footer'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import GoogleMap from '../components/GoogleMap'
import { updateItem, addRequest, reserveItem } from '../Redux/Actions/itemAction'
import { clearError, clearMessage} from '../Redux/Actions/uiAction';
import Message from '../components/Message'
import {Link} from 'react-router-dom'

class ItemDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
            itemid: this.props.match.params.itemId,
            hasReserved : false
        }
    }
    

    reserveItem = (item) => {
        this.props.reserveItem(item.id)
        this.setState({
            hasReserved : true
        })
    }

    GoBack = () => {
        //this.props.history.push("/") 
        this.props.history.goBack()
    }

    togglePopup = () => {
        this.props.clearMessage()
      }

    render() {
    
        return (
            <div>
                <AdminNavBar />
                <MDBContainer>
                    <br />
                    {this.props.ui.newMessage ? 
                    <Message    content = {this.props.ui.message.message}
                                 handleClose = {this.togglePopup}
                                 buttonText = "Ok" /> : null}


                        {this.props.itemlist && this.props.itemlist.map(x => {
                            let disabledBtn;
                            x.userHandle == localStorage.getItem('userhandle') ? disabledBtn = true : disabledBtn = false
                            return (
                                <div>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBCard style = {{width: "28rem", height : '28' }}>
                                            <MDBCardImage 
                                            className="card-img-top" 
                                            src={x.imageUrl} 
                                            waves
                                            zoom
                                             />
                                        </MDBCard>
                                        <MDBCard style = {{width: "28rem", height : '28' }}>
                                            <MDBCardBody>
                                                <h6>Donated by:</h6>
                                                <Link to = {`/profile/${x.userId}`}>{x.userHandle}</Link>
                                                <br />
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBCard>
                                        <MDBCardBody>
                                            <h3>Description</h3>
                                                {"Name: " + x.itemName} <br/> 
                                                {"Category: " + x.category} <br />
                                                {"Details : " + x.description} <br />
                                                {"Condition : " + x.itemCondition} <br />
                                                {"Status : " + x.itemStatus} <br />                             
                                        </MDBCardBody>
                                        </MDBCard>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <h3>Location</h3>
                                                {"Name : " + x.location} <br />
                                            {this.props.collectionpoint && this.props.collectionpoint.map(x => {
                                                return(<div>
                                                    <GoogleMap address={x.Address} lat={x.Coordinates['_lat']} long={x.Coordinates['_long']} />
                                                    <br />
                                                    Address: {x.Address}
                                                </div>)
                                                })}

                                            </MDBCardBody>              
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <br />
                                <MDBRow>      
                                    <MDBBtn outline color="green" onClick={this.GoBack} >  Back
                                    </MDBBtn>
                                </MDBRow>
                                </div>
                            )
                        })}
                   
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.itemId;
    let list = []
    if (state.firestore.ordered.items && state.firestore.ordered.collectionpoint) {
        list = state.firestore.ordered.items
        let singleitem = list.filter(x => x.id === id)
        console.log("id: "+ id)
        console.log(singleitem)
        var location = singleitem[0].location
        let mappoint = state.firestore.ordered.collectionpoint;
        let collectpoint = mappoint.filter(x => x.Name === location)
        return {
            itemlist: singleitem,
            collectionpoint: collectpoint,
            ui : state.ui
        }
    }
    return {
        ui : state.ui
    }
    

}

export default compose(connect(mapStateToProps, { updateItem, addRequest, reserveItem,clearMessage }), firestoreConnect([{ collection: 'items' }, { collection: 'collectionpoint' }]))(ItemDetails)