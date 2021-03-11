import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Login from '../components/Login'

class LoginPage extends Component {

    componentDidMount() {
        //fetch items from firebase server
        fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/login',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //Put user data here
                "email" : "showpic@dogogg.com",
                "password": "123456"
            })
        })
            .then((res) => res.json())
            .then(data => {
                //data is login token
                console.log(data)
                localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
                this.setState({
                    items : data
                })
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Welcome, User!</h1>
                        <Login />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default LoginPage