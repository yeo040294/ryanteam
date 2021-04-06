import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBInput, MDBAnimation, MDBCardImage, MDBCard, MDBFooter} from 'mdbreact'
import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateProfile, getUserData, uploadUserImage } from '../Redux/Actions/userAction'
import { clearError, clearImgLink } from '../Redux/Actions/uiAction';
import { firestoreConnect } from 'react-redux-firebase'
import { PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'

class ProfileUpdate extends Component {

  constructor(props){
    super(props)
    this.state = {
      file : '',
      bio : this.props.user.credentials.bio,
      imageUrl : this.props.user.credentials.imageUrl
    }
  }

  componentDidMount(){
    this.props.getUserData(localStorage.getItem('userid'))
    this.props.clearImgLink()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  submitAll = (e) => {
    e.preventDefault()
    userForm = {
      bio : this.state.bio,
      imageUrl : this.state.imageUrl
    }

  }


 
  onSubmitAll = () => {
    const form = {
      imageUrl: this.state.imageUrl,
      bio: this.state.bio
    }
    //Need userId
    this.props.updateProfile(form, localStorage.getItem("userid"))
  }

  handleImageChange = (event) => {
    console.log("handle image change is called")
    this.setState({
      file : URL.createObjectURL(event.target.files[0])
    })

    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadUserImage(formData);
  };

  GoBack = () => this.props.history.push('/')
  render() {
    const imgLoaderCSS = css`
    margin-top : 25px;
    margin-bottom : 25px;
    margin-left : 150px;
    `
    return (
      <div>
        <Navbar />
        <MDBContainer>
          <br />
          <MDBRow>
            <MDBCol md = '10'>
            <h3>Update your profile image or biography</h3>
            </MDBCol>
            <MDBCol md = '2'>
            <MDBBtn
                    onClick={this.GoBack}
                    outline color="green"
                    className="m-0 px-3 py-2 z-depth-0">
                    Back
                            </MDBBtn> 
            </MDBCol>

        
          </MDBRow>
          <br />
          <br />
          <MDBRow>
            <MDBCol size="5">
              <MDBRow>
              <MDBAnimation type="slideInLeft">
              <MDBCard  style={{ width: "22rem" }}>
                {this.props.ui.uploadImgLink != "" ? 
                <MDBCardImage className="img-fluid" src = {this.state.file} ></MDBCardImage> 
              : <MDBCardImage className="img-fluid" src = {this.state.imageUrl} ></MDBCardImage>}
                
              </MDBCard>
              <MDBFooter>
              <input type = "file" id = "imageInput" onChange = {this.handleImageChange} />
              {this.props.ui.loading &&
                      <div>
                        <p>Uploading image to server...</p>
                        <PulseLoader 
                                loading = "true"
                                size = {12}
                                color = 'pink'
                                css = {imgLoaderCSS}
                                />
                      </div>     
                        }
              </MDBFooter>
              </MDBAnimation>
              </MDBRow>
              <br />
              <MDBRow>
              
              </MDBRow>
              
            </MDBCol>
            <MDBCol size="7">
            <MDBAnimation type="slideInRight">
              
              <class className = 'grey-text'>
              <h6>Tip : Share with everyone what items you are interested in receiving or giving! </h6>
              </class>
              
              <hr />
              
              <MDBInput type = 'textarea'
                        id='bio' 
                        label="Biography" 
                        icon="user" 
                        value={this.state.bio} 
                        rows = "11"
                        onChange={this.handleChange} >
              </MDBInput>
              
              <MDBRow>
                
              
                
              </MDBRow>
              
              </MDBAnimation>
              <MDBBtn
                    onClick={this.submitAll}
                    outline color="pink"
                    className="m-0 px-3 py-2 z-depth-0">
                    Update Profile
                            </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <br />
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    //user: state.firestore.ordered.users,
    user  : state.user,
    ui : state.ui
  }
}
export default compose(connect(mapStateToProps, { updateProfile,getUserData, uploadUserImage, clearError,clearImgLink }), firestoreConnect([{ collection: 'users' }]))(ProfileUpdate)