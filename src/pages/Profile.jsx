import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBInput, MDBAnimation, MDBCard, MDBCardImage, MDBTableHead, MDBTableBody, MDBCardBody, MDBCardHeader, MDBCardFooter } from 'mdbreact'
import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getUserData, uploadUserImage, updateBio } from '../Redux/Actions/userAction'
import { clearError, clearMessage} from '../Redux/Actions/uiAction';
import { firestoreConnect } from 'react-redux-firebase'
import ProfileTableDonated from '../components/Profile/ProfileTableDonated';
import ProfileTableCollected from '../components/Profile/ProfileTableCollected'
import {Link} from 'react-router-dom' 
import { PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'

class Profile extends Component {

  constructor(props){
    super(props);
    const { match } = this.props;
    const matchUrl = match.url;
    let arr = matchUrl.split("/")

    this.state = {
      userId : arr[2],
      userHandle : '',
      changeBio : false,
      bio : this.props.user.credentials.bio
    }
  }

  GoBack = () => { this.props.history.goBack() }

  componentDidMount(){
    this.props.getUserData(this.state.userId)
    this.props.clearMessage()
    this.setState({
      userHandle : this.props.user.credentials.handle
    })
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        bio : nextProps.user.credentials.bio
      })
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

  Navigate = (itemId) => {
    this.props.history.push("/itemDetails/" + itemId)
}

togglePopup = () => {
  console.log("tooglePopout is geting pressed")
  this.props.clearMessage()
  this.props.clearError()
  this.props.getUserData(localStorage.getItem('userid'))
}

toggleEditBio = () => {
  this.setState((prevState) => ({
    ...prevState,
    changeBio : !prevState.changeBio,
    bio : this.props.user.credentials.bio
  }))
  
}

handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

updateProfile = () => {
  let newBio = this.state.bio
  this.props.updateBio(newBio)
  this.setState({
    changeBio : false,
    bio : this.props.user.credentials.bio
  })
}

  GoBack = () => this.props.history.push('/')

  render() {

    const imgLoaderCSS = css`
        margin-top : 25px;
        margin-bottom : 25px;
        margin-left : 85px;
        `

    return (
      <div>
        <Navbar />
        <MDBContainer>
        
        {this.props.ui.newMessage && 
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <p>Message</p>
                    <p>{this.props.ui.message.message}</p>
                    <p><button onClick = {this.togglePopup}>Ok</button></p>
                    </MDBCardBody>
                </MDBCard>
            </div>
        }
          <br />
          <MDBAnimation type='slideInDown'>
          <MDBRow>
          
            <MDBCol md = '3'>
            
              <MDBCard>
                <MDBCardImage className="img-fluid" src={this.props.user.credentials.imageUrl} waves />
                {this.state.userId == localStorage.getItem('userid') ? <MDBCardFooter>Upload a new picture : 
                <input type = "file" id = "imageInput" onChange = {this.handleImageChange} disabled = {this.props.ui.loading}/>
                <br />
                <PulseLoader          
                  loading = {this.props.ui.loading}
                  size = {12}
                  color = 'pink'
                  css = {imgLoaderCSS}
                  />
                </MDBCardFooter> :  null }
              </MDBCard>
              
            </MDBCol>
            <MDBCol md = '9'>
              <MDBCard>
                <MDBCardHeader>
                    {this.props.user.credentials.handle}'s profile 
                </MDBCardHeader>
                <MDBCardBody>
                  User biography : 
                  <MDBInput type = "textarea" 
                            name = "bio"
                            value = {this.state.bio} 
                            disabled = {!this.state.changeBio}
                            rows = "5"
                            onChange = {this.handleChange}>
                  </MDBInput>
          
                  <p>{this.state.userId == localStorage.getItem('userid') ? 
                  <div>
                  <MDBBtn 
                    size="sm"
                    outline color="pink" 
                    onClick = {this.state.changeBio? this.updateProfile : this.toggleEditBio}>
                      {this.state.changeBio? 'confirm' : 'edit'}
                      </MDBBtn>
                  {this.state.changeBio &&
                  <MDBBtn 
                    size="sm"
                    outline color="pink" 
                    onClick = {this.toggleEditBio}>cancel</MDBBtn>
                  }
                  </div>
                   : null}</p>
                  
                  
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </MDBAnimation>     
          {/*Display user donated items*/}
          <br></br>
          <MDBRow>
            
            <MDBCol size="12">
                  <MDBAnimation type='slideInUp'>
                      <h2>Donated Items</h2>
                      <ProfileTableDonated navigate={this.Navigate} 
                                    myRequest={this.props.itemlist } 
                                    userHandle = {this.props.user.credentials.handle} />
                  </MDBAnimation>
            </MDBCol>
          </MDBRow>

          {/*Display user collected items*/}
          <MDBRow>
          <MDBCol size="12">
                  <MDBAnimation type='slideInUp'>
                  <h2>Collected Items</h2>
                  <ProfileTableCollected navigate={this.Navigate} 
                                    myRequest={this.props.collectRefList} 
                                    userId = {this.state.userId} />

                  </MDBAnimation>
            </MDBCol>
            <MDBBtn outline color="green" onClick={this.GoBack} > Back
                       </MDBBtn>
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
    user : state.user,
    itemlist: state.firestore.ordered.items,
    collectRefList  :state.firestore.ordered.collectionReference,
    ui : state.ui
  }
}

export default compose(connect(mapStateToProps, {getUserData, uploadUserImage, clearError,clearMessage, updateBio}), 
firestoreConnect([{ collection: 'items'}, {collection: 'collectionReference' }]))(Profile)