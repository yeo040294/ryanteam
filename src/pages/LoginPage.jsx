import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Login from '../components/Login'
import { loginUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class LoginPage extends Component {

    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            errors : {}
        }
    }

    //useEffect()

    //1. link button to this
    handleSubmit = (event) =>{
        //2. Save what user entered to here
        const userData = {
            email : "baba@baba.com",
            password : "123456"
        }
        this.props.loginUser(userData, this.props.history)
        //3. display error - if user enters wrong login/pass the error state will be updated to
        //{error : general : "Wrong password"}
    }

    componentDidMount() {
        //For testing 
        // const userData = {
        //     email : "baba@baba.com",
        //     password : "123456"
        // }
        // this.props.loginUser(userData, this.props.history)
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
const mapStateToProps = state => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
        {loginUser}
    , dispatch);

//export default LoginPage
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)