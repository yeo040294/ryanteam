import React, { Component } from 'react'
import Card from '../components/Card'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../Redux/Actions/TwitterAction'


class Home extends Component {
    componentDidMount() {
        //fetch items from firebase server
        fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/allItems')
            .then((res) => res.json())
            .then(data => {
            console.log(data)
            })
            .catch((err) => console.log(err));
        this.props.fetchPosts();
    }
    render() {
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
Home.propTypes = {
    fetchPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    twitter: state.twitter.items
});

export default connect(mapStateToProps, { fetchPosts })(Home)
