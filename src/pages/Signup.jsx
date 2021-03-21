import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { registerUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            customer:{
            email : props.email,
            password : props.password,
            confirmPassword : props.confirmPassword,
            handle : props.handle
        }
        }
    }

// The gamechanger: extract the inputs from the form
    handleChanged(event) {
        var customer        = this.state.customer;
        customer.handle  = event.target.value;
        this.setState({ customer:customer });
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

      confirmPasswordChanged(event) {
        var customer        = this.state.customer;
        customer.confirmPassword  = event.target.value;
        this.setState({ customer:customer });
      }

      handleSubmit() {
        console.log(this.state.customer);
        this.props.registerUser(this.state.customer, this.props.history) // componentDidMount
      }

    render() {
        return (
            <MDBContainer >
                <MDBRow >
                    <MDBCol size= '12' >
                        <h1>Create a new account!</h1>
                    </MDBCol>
                    <MDBCol md="6">
                        { <form>
                        <div className="grey-text">
                            <MDBInput label="Username" icon="user-alt" group type ="text" validate error="wrong" 
                            success="right" value={this.state.customer.handle} onChange={this.handleChanged.bind(this)} />
                            <MDBInput label="Email Address" icon="envelope" group type="email" validate error="wrong"
                            success="right"   value={this.state.customer.email} onChange={this.emailChanged.bind(this)}/>
                            <MDBInput label="Password" icon="lock" group type="password" validate  value={this.state.customer.password} onChange={this.passwordChanged.bind(this)}/>
                            <MDBInput label="Confirmed Password" icon="lock" group type="password" validate  value={this.state.customer.confirmPassword} onChange={this.confirmPasswordChanged.bind(this)}/>
                        </div>
                        <div className="text-center">
                            <MDBBtn onlick={this.handleSubmit(this)} color = "red" size = "lg" href= "http://localhost:3000/login">Sign Up</MDBBtn>
                        </div>
                        </form> }
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
const mapDispatchToProps = dispatch => bindActionCreators({registerUser} , dispatch);

//export default Signup
export default connect(mapStateToProps, mapDispatchToProps)(Signup)