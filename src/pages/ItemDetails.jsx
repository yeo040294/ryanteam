import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardText, MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getItem, requestItem } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom';

class ItemDetails extends Component {

    constructor (props){
        super(props)
        this.handleRequestItem = this.handleRequestItem.bind(this)
    }

    componentDidMount(){
        const { match } = this.props;
        const matchUrl = match.url;
        this.props.getItem(matchUrl)
    }

    handleRequestItem(){
        console.log("button is clicked")
        const { match } = this.props;
        const matchUrl = match.url;
        console.log("this is my match url: "+matchUrl)
        this.props.requestItem(matchUrl)

        //look at dev tools
        //if successful, new message state
        //if unsuccessful new error state
    }
    
   
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h1>{this.props.selectedItem.itemName}</h1>
                    </MDBCol>
                    <MDBCol md = '2'>
                        <MDBBtn>
                            <MDBIcon icon="success" className="mr-1" />
                            Previous page
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol md = '2'>
                        <MDBBtn onClick = {() => {this.handleRequestItem()}}>
                            <MDBIcon icon="success" className="mr-1" />
                            Request for item!
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md = '6'>
                        <MDBCardImage className="img-fluid" src={this.props.selectedItem.imageUrl} waves />
                    </MDBCol>

                    <MDBCol md = '6'>
                        <MDBCard>
                            <MDBCardBody>
                                <h4>Description</h4>   
                                   <p>Category : {this.props.selectedItem.category}</p> 
                                   <p>Item condition : {this.props.selectedItem.itemCondition}</p>
                                   <p>Location : {this.props.selectedItem.location}</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody>
                                <h4>Ballot time</h4>   
                                    <p>{this.props.selectedItem.ballotTime}</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody>
                                <h4>Donated by</h4>   
                                    <p>{this.props.selectedItem.userHandle}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

                {/**<div><h1>Item Details</h1>
                <h3>{this.props.selectedItem.itemName}</h3>
                <h3>{this.props.selectedItem.category}</h3>
                <h3>{this.props.selectedItem.userHandle}</h3>
                <h3>{this.props.selectedItem.ballotTime}</h3>
                <h3>{this.props.selectedItem.itemCondition}</h3>
                <h3>{this.props.selectedItem.imageUrl}</h3>
                <button onClick = {() => {this.handleRequestItem()}}>Request for item!</button> </div>*/}
            </MDBContainer>
            
                 


                
            
            
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user.user,
        selectedItem : state.item.selectedItem,
        ui : state.ui
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getItem, requestItem}
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
//export default ItemDetails;