import React, { Component, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { loginUser } from '../Redux/Actions/userAction'
import { connect } from 'react-redux'
import GuestNavbar from '../components/GuestNavBar';
import Footer from '../components/Footer';
import { compose, bindActionCreators } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { clearError } from '../Redux/Actions/uiAction';

class LoginPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount(){
        this.props.clearError()
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(form)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.logintoken.token) {
            let isAdmin = false
            localStorage.setItem("token", nextProps.logintoken.token)
            localStorage.setItem("username", this.state.email)
            let user = this.props.userlist.filter((user) => user.email == this.state.email)
            if (localStorage.getItem("username")) {
                localStorage.setItem("userhandle", user[0].handle);
                localStorage.setItem("userid", user[0].userId);
                localStorage.setItem("image", user[0].imageUrl);
                isAdmin = user[0].isAdmin
            }
            
            if(isAdmin){
                localStorage.setItem("usertype", "Admin")
                this.props.history.push('/approval')
                //this.props.history.push('/')
            }
            else{
                localStorage.setItem("usertype", "Normal User")
                this.props.history.push('/')
            }
        }
        else if (nextProps.logintoken.error) {
            this.setState({ email: '', password: '' })
            alert(nextProps.logintoken.error)
        }

        if(nextProps.ui.errors){
            this.setState({errors: nextProps.ui.errors})
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <GuestNavbar />
                <MDBContainer >
                    <br />
                    <MDBRow>
                        <MDBCol md="12">
                            <div className = "red-text">
                                {errors.email && <p>{errors.email}</p>}
                                {errors.password && <p>{errors.password}</p>}
                                {errors.general && <p>{errors.general}</p>}
                                {errors.error && <p>{errors.error}</p>}
                            </div>
                            <h3 className="pink-text">Welcome to SecondLove</h3>
                            <hr />
                            <br />
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="Email Address" id="email" icon="envelope" onChange={this.handleChange} group type="email" validate error="wrong" success="right" value={this.state.email} />
                                    <MDBInput label="Password" icon="lock" group type="password" onChange={this.handleChange} id="password" validate value={this.state.password} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={this.handleSubmit} color="red" size="lg">Login</MDBBtn>
                                    <p></p>
                                    <p> Don't have an account ? Sign up <Link to = "/signup">here</Link></p>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <br />
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    logintoken: state.user.response,
    userlist: state.firestore.ordered.users,
    ui : state.ui
});

const mapDispatchToProps = dispatch => bindActionCreators({loginUser, clearError} , dispatch);

//export default LoginPage
export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{ collection: 'users' }]))(LoginPage)