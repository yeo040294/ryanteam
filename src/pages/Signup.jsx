import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { registerUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import GuestNavBar from '../components/GuestNavBar'
import Footer from '../components/Footer'
import { compose, bindActionCreators } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { clearError } from '../Redux/Actions/uiAction';

class Signup extends Component {
    constructor(props){
    super(props)
    this.state = {
        handle: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors:{}
    }
    }
    componentDidMount(){
        this.props.clearError()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle : this.state.handle
        }
        this.props.registerUser(userData, this.props.history)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({errors : nextProps.ui.errors})
        }
        if (nextProps.logintoken.token) {
            localStorage.setItem("token", nextProps.logintoken.token)
            localStorage.setItem("username", this.state.email)
            let user = this.props.userlist.filter((user) => user.email == this.state.email)
            if (localStorage.getItem("username")) {
                localStorage.setItem("userhandle", user[0].handle);
                localStorage.setItem("userid", user[0].userId);
                localStorage.setItem("image", user[0].imageUrl);
            }
            localStorage.setItem("usertype", "Normal User")
            this.props.history.push('/')
        }
        else if (nextProps.logintoken.error) {
            this.setState({ email: '', password: '' })
            alert(nextProps.logintoken.error)
        }
    }
    
    render() {
        const { errors } = this.state

        return (
            <React.Fragment>
                <GuestNavBar />
                <br />
                <MDBContainer >
                    <MDBRow >
                        <MDBCol size='12' >
                            <h1>Create a new account!</h1>
                        </MDBCol>
                        <MDBCol md="6">
                            <div className = "red-text">
                            {errors.handle && <p>! {errors.handle}</p>}
                            {errors.email && <p>! {errors.email}</p>}
                            {errors.password && <p>! {errors.password}</p>}
                            {errors.general && <p>! {errors.general}</p>}
                            {errors.confirmPassword && <p>! {errors.confirmPassword}</p>}
                            </div>
                            
                            {<form>
                                <div className="grey-text">
                                    <MDBInput 
                                        label="Username" 
                                        name = "handle"
                                        onChange={this.handleChange} 
                                        icon="user-alt" 
                                        group type="text" 
                                        validate 
                                        error="wrong"
                                        success="right" 
                                        value={this.state.handle} />

                                    <MDBInput 
                                        label="Email Address" 
                                        icon="envelope" 
                                        name = "email"
                                        onChange={this.handleChange} 
                                        group 
                                        type="email" 
                                        validate 
                                        error="wrong"
                                        success="right" 
                                        value={this.state.email} />

                                    <MDBInput 
                                        label="Password" 
                                        name="password"
                                        icon="lock" 
                                        group 
                                        onChange={this.handleChange} 
                                        type="password" 
                                        validate 
                                        value={this.state.password} />

                                    <MDBInput 
                                        label="Confirm Password" 
                                        name = "confirmPassword"
                                        icon="lock" 
                                        onChange={this.handleChange} 
                                        group 
                                        type="password" 
                                        validate 
                                        value={this.state.confirmPassword} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn 
                                        onClick={this.handleSubmit} 
                                        color = "red" 
                                        size = "lg">
                                        Sign Up
                                    </MDBBtn>
                                </div>
                            </form>}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <br />
                <Footer />
            </React.Fragment>

        )
    }
}
const mapStateToProps = state => ({
    logintoken: state.user.response,
    userlist: state.firestore.ordered.users,
    ui : state.ui
})
const mapDispatchToProps = dispatch => bindActionCreators({registerUser, clearError} , dispatch);

//export default Signup
//export default connect(mapStateToProps, { registerUser })(Signup)
export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{ collection: 'users' }]))(Signup)