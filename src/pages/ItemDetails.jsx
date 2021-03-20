import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getItem } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom';

class ItemDetails extends Component {

    componentDidMount(){
         //For testing 
         const { match } = this.props;
         const matchUrl = match.url;
        this.props.getItem(matchUrl)
    }

    render() {
        console.log("this is the item name of item "+ this.props.selectedItem.itemName)
        return (
            <div>
                <h1>Item Details</h1>
                <h3>{this.props.selectedItem.itemName}</h3>
                <h3>{this.props.selectedItem.category}</h3>
                <h3>{this.props.selectedItem.userHandle}</h3>
                <h3>{this.props.selectedItem.ballotTime}</h3>
                <h3>{this.props.selectedItem.itemCondition}</h3>
                <h3>{this.props.selectedItem.imageUrl}</h3>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // Assigning the state properties into our propname
        // propname  :  state.somefield
        selectedItem : state.item.selectedItem
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getItem}
    , dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails)
//export default ItemDetails;