import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { loginUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class LoginPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer:{
            email : props.email,
            password : props.password
            }
        }
    }

    emailChanged(event) {
        var customer        = this.state.customer;
        customer.email  = event.target.value;
        this.setState({ customer:customer });
      }

      passwordChanged(event) {
        var customer        = this.state.customer;
        customer.password  = event.target.value;
        this.setState({ customer:customer });
      }

    //1. link button to this
    handleSubmit(){
        this.props.loginUser(this.state.customer, this.props.history)
        //3. display error - if user enters wrong login/pass the error state will be updated to
        //{error : general : "Wrong password"}
    }
    
    render() {
        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Welcome, User!</h1>
                    </MDBCol>
                    <MDBCol md="6">
                        <form>
                            <div className="grey-text">
                            <MDBInput label="Email Address" icon="envelope" group type="email" validate error="wrong"
                            success="right"  value={this.state.customer.email} onChange={this.emailChanged.bind(this)}/>
                            <MDBInput label="Password" icon="lock" group type="password" validate  value={this.state.customer.password} onChange={this.passwordChanged.bind(this)}/>
                            </div>
                            <div className="text-center">
                            <MDBBtn onlick={this.handleSubmit(this)} color = "red" size = "lg" href= "http://localhost:3000">Login</MDBBtn>
                            <p></p>
                            <p> <a href="http://localhost:3000/signup" >Click here to sign up if don't have an account</a></p>
                            </div>
                        </form>
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

const mapDispatchToProps = dispatch => bindActionCreators({loginUser} , dispatch);

//export default LoginPage
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)