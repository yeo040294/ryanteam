import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"

class Signup extends Component {

    componentDidMount() {
        //fetch items from firebase server
        fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/signup',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //Put user data here, take note : signing up twice with same data will return error in JSON
                "email" : "newuser001@dogogg.com",
                "password": "123456",
                "confirmPassword" : "123456",
                "handle" : "newuser001"
            })
        })
            .then((res) => res.json())
            .then(data => {
                localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
                //data is login token
                console.log(data)
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Welcome, User!</h1>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default Signup