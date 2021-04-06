import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import GoogleMap from '../components/GoogleMap'
import { updateItem, addRequest, reserveItem} from '../Redux/Actions/itemAction'


class ItemDetails extends Component {
    state = {
        itemid: this.props.match.params.itemId,
    };

    reserveItem = (item) => {
        this.props.reserveItem(item.id)
    }

    GoBack = () => { this.props.history.push("/") }

    render() {
    
        return (
            <div>
                <Navbar />
                <MDBContainer>
                    <br />

                    <MDBRow>
                        {this.props.itemlist && this.props.itemlist.map(x => {
                            let disabledBtn;
                            x.userHandle == localStorage.getItem('userhandle') ? disabledBtn = true : disabledBtn = false
                            return (
                                <MDBCol size="6">
                                    <h2>Item Details</h2>
                                    <hr />
                                    <MDBCard style={{ width: "22rem" }}>
                                        <MDBCardImage className="img-fluid" src={x.imageUrl} waves />
                                        <MDBCardBody>
                                            <MDBCardTitle>{x.itemName} <br/> {"Category: " + x.category}</MDBCardTitle>
                                            <MDBCardText>
                                                {x.description} <br />
                                                {x.location}
                                            </MDBCardText>
                                            {((x.itemStatus == "Donated" || x.itemStatus == "PendingCollection") && 
                                            <MDBBtn 
                                            onClick={() => this.reserveItem(x)} 
                                            outline color="pink" 
                                            disabled = "true" > Not available </MDBBtn>)  }
                                            {((x.itemStatus !== "Donated" && x.itemStatus !== "PendingCollection") && 
                                            <MDBBtn 
                                            onClick={() => this.reserveItem(x)} 
                                            outline color="pink"
                                            disabled = {disabledBtn}>Reserve Item</MDBBtn>)  }
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            )
                        })}

                        <MDBCol size="6">
                            <h2>Item Location</h2>
                            <hr />
                            {this.props.collectionpoint && this.props.collectionpoint.map(x => {
                                return (
                                    <div>
                                        <GoogleMap address={x.Address} lat={x.Coordinates['_lat']} long={x.Coordinates['_long']} />
                                        <br />
                                        Address: {x.Address}
                                    </div>
                                )
                            })}
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn outline color="green" onClick={this.GoBack} >  Back
                       </MDBBtn>
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
            collectionpoint: collectpoint
        }
    }
    return {
        ui : state.ui
    }

}

export default compose(connect(mapStateToProps, { updateItem, addRequest, reserveItem }), firestoreConnect([{ collection: 'items' }, { collection: 'collectionpoint' }]))(ItemDetails)