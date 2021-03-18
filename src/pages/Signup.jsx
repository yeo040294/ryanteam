import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Register from '../components/Register'
import { registerUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Signup extends Component {

    constructor(){
        super()
        this.state = {
            email : 'xintian3@email.com',
            password : '123456',
            confirmPassword : '123456',
            handle : 'xintian3',
            errors : {}
        }
    }

    //useEffect()

    //1. link button to this
    handleSubmit = (event) =>{
        //2. Save what user entered to here
        const userData = {
            email : 'xintian1@email.com',
            password : '123456',
            confirmPassword : '123456',
            handle : 'xintian1'
        }
        // this.props.registerUser(userData, this.props.history)
    }

    componentDidMount() {
        //For testing 
        console.log("running component id mount")
        const userData = {
            email : 'xintian8@email.com',
            password : '123456',
            confirmPassword : '123456',
            handle : 'xintian8'
        }
        this.props.registerUser(userData, this.props.history)
    }

    render() {
        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Create a new account!</h1>
                        <Register />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {registerUser}
    , dispatch);

//export default LoginPage
export default connect(mapStateToProps, mapDispatchToProps)(Signup)