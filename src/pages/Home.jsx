import React, { Component } from 'react'
import Card from '../components/Card'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../Redux/Actions/TwitterAction'
import { getAvailableItems } from '../Redux/Actions/itemAction'
import { bindActionCreators } from 'redux'

class Home extends Component {
    
    componentDidMount() {
        this.props.getAvailableItems()
       // this.props.fetchPosts()
    }

    render() {
        //item is an array of items
        console.log(this.props.item)

        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        {this.props.twitter && this.props.twitter.map(x => {
                            return (
                                <MDBCol lg="4">
                                    <Card post={x} />
                                </MDBCol>
                            )
                        })}

                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

// Home.propTypes = {
//     fetchPosts: PropTypes.func.isRequired
// }

const mapStateToProps = state => {
    return {
        // Assigning the state properties into our propname
        // propname  :  state.somefield
        //credentials : state.credentials
        item : state.item.items
        //item : state.item
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {getAvailableItems, fetchPosts}
    , dispatch);

//connect is a function, returns a higher order component
//higher order component is wrapping the home component
export default connect(mapStateToProps, mapDispatchToProps)(Home)
