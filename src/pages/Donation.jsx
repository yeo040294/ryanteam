import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn, MDBAnimation } from 'mdbreact'
import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import DonationGoogleMap from '../components/Donation/DonationGoogleMap'
import Uploadfile from '../components/Profile/Uploadfile'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { donateItem, uploadItemImage } from '../Redux/Actions/itemAction'
import { PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'
import { clearError, clearImgLink } from '../Redux/Actions/uiAction';
import { validateDonateItemData } from '../util/validators'

class Donation extends Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      lat: '',
      long: '',
      categories: ["Home and Living", "Sports", "Electronic", "Toys", "Clothes", "Luxury", "Automobile"],
      category: 'Home and Living',
      name: '',
      description: '',
      location: 'MINDS Shop@Rosyth',
      itemCondition: 'WellUsed',
      formErrors : {}
    }
  }
  

  componentDidMount() {
    this.props.clearError()
    this.props.clearImgLink()
  }


  handleChange = (e) => {
    //console.log(this.state.name, this.state.description) // to change state everytime you type -- question: value
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  GoBack = () => { this.props.history.push("/") }

  handleChangeMap = (e) => {
    //console.log(this.state.name, this.state.description) // to change state everytime you type -- question: value
    var selectedPoint = this.props.collectionlist.filter((point) => point.Name == e.target.value);
    //console.log(selectedPoint);
    this.setState({
      [e.target.id]: e.target.value,
      lat: selectedPoint[0].Coordinates._lat,
      long: selectedPoint[0].Coordinates._long
    })

  }

  handleSubmit = () => {
    const form = {
      approved: false,
      ballotTime: '',
      category: this.state.category ? this.state.category : "home and living",
      createdAt: new Date().toISOString(),
      description: this.state.description,
      imageUrl: this.props.ui.uploadImgLink.message,
      itemCondition: this.state.itemCondition,
      itemName: this.state.name,
      itemStatus: "pendingApproval",
      location: this.state.location,
      requestCount: 0,
      userHandle: localStorage.getItem("userhandle"),
      userId : localStorage.getItem("userid")

    }

    const { errors, valid } = validateDonateItemData(form)
    if(!valid){
      this.setState({
        formErrors : {...errors}
      })
    }
    else{
      this.props.donateItem(form);
      //alert("Thank you for your donation!");
      this.setState({
        file: '',
        lat: '',
        long: '',
        category: '',
        name: '',
        description: '',
        location: '',
        itemCondition: ''
      })
      this.props.history.push('/mydonate')
    }
    
  }

  handleImageChange = (event) => {
    console.log("handle image change is called")
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })

    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadItemImage(formData);
  };



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
            <MDBCol>
              <MDBAnimation type = 'slideInLeft'>
              <div>
                <div className = "red-text">
                {this.state.formErrors.itemName && <div>{this.state.formErrors.itemName}</div>}
                {this.state.formErrors.description && <div>{this.state.formErrors.description}</div>}
                {this.state.formErrors.imageUrl && <div>{this.state.formErrors.imageUrl}</div>}
                </div>
                <h3>Donation</h3>
                <hr />
                <MDBCol col-md-1>
                  <MDBInput id='name' label="Item name" type="text" value={this.state.name} onChange={this.handleChange} validate error="wrong" />
                  <MDBInput id='description' type="textarea" value={this.state.description} onChange={this.handleChange} label="Enter the item description here" rows="5" />

                  <h6>Item Condition</h6>
                  <select placeholder class="browser-default custom-select" 
                    value={this.state.itemCondition} 
                    id="itemCondition" 
                    onChange={this.handleChange}>
                    <option value='WellUsed'>Well Used</option>
                    <option value='SlightlyUsed'>Slightly Used</option>
                    <option value='New'>New</option>
                  </select>

                  <h6>Select Category</h6>
                  <select placeholder class="browser-default custom-select" 
                    value={this.state.category} 
                    id="category" 
                    onChange={this.handleChange}>
                    {this.state.categories.map((each) => {
                      return (
                        <option value={each}>{each}</option>
                      )
                    })}
                  </select>

                  <p></p>

                  <h6>Upload Image</h6>
                  {/**<Uploadfile id="image" picUpload={this.PictureUploaded} ></Uploadfile> */}
                  <input type = "file" id = "imageInput" onChange = {this.handleImageChange} />
                  <MDBRow>
                    {this.props.ui.loading &&
                      <div>
                        <p>Uploading image to server...</p>
                        <PulseLoader 
                                loading = {this.props.loading}
                                size = {12}
                                color = 'pink'
                                css = {imgLoaderCSS}
                                />
                      </div>     
                        }
                  </MDBRow>
                  
                </MDBCol>
                <img src={this.state.file} width='500' height='500' />

              </div>
              </MDBAnimation>
            </MDBCol>
            <MDBCol>
            <MDBAnimation type = 'slideInRight'>
              <MDBRow>
                <h3>Map Location</h3>
                <hr />
                <DonationGoogleMap lat={this.state.lat} long={this.state.long} name={this.state.location} />
              </MDBRow>

              <br />
              <br />
              <MDBRow>
                <h6>Select Drop-off Location</h6>
                <hr />
                <select class="browser-default custom-select" id="location" value={this.state.location} onChange={this.handleChangeMap}>
                  {this.props.collectionlist && this.props.collectionlist.map((point) => {
                    return (
                      <option value={point.Name}>{point.Name}</option>
                    )
                  })}
                </select>
                Name: {this.state.location}  <br />
                Lat: {this.state.lat} <br />
                Long: {this.state.long}
              </MDBRow>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
          <MDBBtn 
            outline color="pink" 
            onClick={this.handleSubmit}
            disabled = {this.props.ui.loading}>Submit </MDBBtn>
          <MDBBtn outline color="green" onClick={this.GoBack} > Back
                       </MDBBtn>
        </MDBContainer>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemlist: state.firestore.ordered.items,
    collectionlist: state.firestore.ordered.collectionpoint,
    ui : state.ui
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {uploadItemImage, donateItem, clearError, clearImgLink}
, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([{ collection: 'items' }, { collection: 'collectionpoint' }]))(Donation)
