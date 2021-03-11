import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CarouselPage from '../components/CarouselPage'
import Card from '../components/Card'
import CategoriesBtn from '../components/CategoriesBtn'

export default class Main extends Component {
    state = { //dummy data
        Posts: [
            {
                image: 'https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg',
                name: 'Apple',
                description: 'asd',
            },
            {
                image: 'https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg',
                name: 'Banana',
                description: 'asa',
            },
            {
                image: 'https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg',
                name: 'Orange',
                description: 'wda',
            },
        ],
        
    }

    componentDidMount() {
        //fetch items from firebase server
        fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/allItems')
            .then((res) => res.json())
            .then(data => {
            console.log(data)
            this.setState({
                items : data
            })
            })
            .catch((err) => console.log(err));
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
                        {this.state.Posts && this.state.Posts.map(x => {
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
                        <CategoriesBtn></CategoriesBtn>
                        
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        )
    }
}
