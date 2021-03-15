import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchAllItems } from '../Redux/Actions/ItemsAction' 

class Main extends Component {
    state = {
        FilteredPosts: '',
    }

    componentDidMount() {
        this.props.fetchAllItems();
        console.log(this.props.Posts);
    }

    FilterPosts = (id) => {
        //console.log(id);
        let newPosts = this.props.Posts;
        const result = newPosts.filter(x => x.category == id)
        this.setState(state => ({
            ...state,
            FilteredPosts: result,
        }));
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow >
                    <MDBCol size>
                        <div>
                            <MDBBtn className='red-text pr-4 pl-4' floating size="lg" color='white'>
                                <MDBIcon icon="align-justify" />
                            </MDBBtn>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <CarouselPage />
                    </MDBCol>
                </MDBRow>
                <br />
                <br />

                <MDBRow>
                    <MDBCol>
                        <h3>Popular Listings</h3>
                        <MDBRow>
                        {this.props.Posts && this.props.Posts.map(x => {
                                return (
                                    <MDBCol lg="4">
                                        <Card post={x} />
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>

                <br />
                <br />

                <MDBRow>
                    <MDBCol>
                        <h3> Categories </h3>
                        <CategoriesBtn posts= {this.FilterPosts}></CategoriesBtn>
                        <MDBRow>
                        { this.state.FilteredPosts && this.state.FilteredPosts.map(x => {
                                return (
                                    <MDBCol lg="4">
                                        <Card post={x} />
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        )
    }
}
Main.propTypes = {
    fetchAllItems: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    Posts: state.items.items
});

export default connect(mapStateToProps, { fetchAllItems })(Main)