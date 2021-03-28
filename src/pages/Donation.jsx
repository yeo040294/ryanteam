import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn} from 'mdbreact'
import React, { Component, useState } from 'react'
import { donateItem, uploadItemImage, clearSelectedItem } from '../Redux/Actions/itemAction'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearMessage, clearError } from '../Redux/Actions/uiAction'
import { BounceLoader, BeatLoader } from 'react-spinners'
import { css } from '@emotion/react'

 class Donation extends Component {
    constructor(props){
        super(props)
        this.state = {
          file: null,
          itemName : '',
          description : '',
          category : 'home and living',
          itemCondition : 'New',
          imageUrl : '',
          location : 'Cash Converters@Ang Mo Kio'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

      handleChange=(e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.props.someCallback(value);
      }

      handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked :  target.value
        const name = target.name
        
        this.setState({
          [name] : value
        })

        e.preventDefault()
      }

    handleSubmit() {
      console.log("handle sumbit button is clicked clacked")
      console.log(this.props.ui)
      const itemData =  {
        itemName : this.state.itemName,
        description : this.state.description,
        category : this.state.category,
        itemCondition : this.state.itemCondition,
        imageUrl :this.props.message,
        location : this.state.location
      }
      this.props.donateItem(itemData, this.props.history) 
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

    togglePopup = () => {
      console.log("tooglePopout is geting pressed")
      this.props.clearError()
    }

    render() {
      let disabled
      if(this.props.loading)disabled = true
      else{disabled = false}

      const loaderCSS = css`
            margin-top : 25px;
            margin-bottom : 25px;
            margin-left : 550px;
        `
        return (
          <div>
            {this.props.message.newMessage && 
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <p>Message</p>
                    <p>{this.props.message.message.general}</p>
                    <p><button onClick = {this.togglePopup}>Ok</button></p>
                    </MDBCardBody>
                </MDBCard>
            </div>
            }

            {this.props.ui.newError && 
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <p>Error</p>
                    <p>{this.props.ui.errors.error}</p>
                    <p><button onClick = {this.togglePopup}>Ok</button></p>
                    </MDBCardBody>
                </MDBCard>
            </div>
            }
            
            <MDBContainer>
              {/**
               * after successful upload -> response is the item data -> now have new selectedItem in state
               * TO-DO : show success message
               * TO-DO : remove push(/profile) in itemAction
               */}
              
                <MDBRow>
                    <MDBCol>
                        <h3>Donate your item to SecondLove!</h3>
                        <MDBCol col-md-1>
                          <form>
                            <MDBRow>
                              <label>
                                Enter Item name:
                                <input type= "text" name = "itemName" value = {this.state.itemName} onChange = {this.handleInputChange}/>
                              </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                Enter description:
                                <input type= "textarea" name = "description" value = {this.state.description} onChange = {this.handleInputChange}/>
                            </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                Select Category:
                                <select value={this.state.category} onChange={this.handleInputChange} name = "category">
                                  <option value = "home and living">Home and Living</option>
                                  <option value = "sports">Sports</option>
                                  <option value = "electronic">Electronic</option>
                                  <option value = "toys">Toys</option>
                                  <option value = "clothes">Clothes</option>
                                  <option value = "luxury">Luxury</option>
                                  <option value = "automobile">Automobile</option>
                                </select>
                              </label>
                            </MDBRow>
                            <MDBRow>
                              <label>
                                  Select your item's Condition:
                                  <select value={this.state.itemCondition} onChange={this.handleInputChange} name = "itemCondition">
                                    <option value = "New">New</option>
                                    <option value = "SlightlyUsed">SlightlyUsed</option>
                                    <option value = "WellUsed">WellUsed</option>
                                  </select>
                                </label>
                            </MDBRow>
                            <MDBRow>
                            <label>
                                  Select the location to donate to:
                                  <select value={this.state.location} onChange={this.handleInputChange} name = "location">
                                    <option value = "Cash Converters@Ang Mo Kio">Cash Converters@Ang Mo Kio</option>
                                    <option value = "Touch Community Services: 301 Thrift Mart">Touch Community Services: 301 Thrift Mart</option>
                                    <option value = "Cash Converters@Bedok">Cash Converters@Bedok</option>
                                    <option value = "Cash Converters@Chinatown">Cash Converters@Chinatown</option>
                                    <option value = "Cash Converters@Jurong">Cash Converters@Jurong</option>
                                    <option value = "Cash Converters@Tampines">Cash Converters@Tampines</option>
                                    <option value = "Cash Converters@Toa Payoh">Cash Converters@Toa Payoh</option>
                                    <option value = "MINDS Shop@Margaret">MINDS Shop@Margaret</option>
                                    <option value = "MINDS Shop@Woodlands">MINDS Shop@Woodlands</option>
                                    <option value = "MINDS Shop@Rosyth">MINDS Shop@Rosyth</option>
                                    <option value = "MINDS Shop@Napiri">MINDS Shop@Napiri</option>
                                    <option value = "MINDS Shop Plus@NTUC Eldercare Silver Activity Centre">MINDS Shop Plus@NTUC Eldercare Silver Activity Centre</option>
                                    <option value = "The Salvation Army@Bukit Timah">The Salvation Army@Bukit Timah</option>
                                    <option value = "The Salvation Army@Tanglin">The Salvation Army@Tanglin</option>
                                    <option value = "The Salvation Army@Changi">The Salvation Army@Changi</option>
                                    <option value = "The Salvation Army@Bishan">The Salvation Army@Bishan</option>
                                    <option value = "The Salvation Army@Pasir Panjang">The Salvation Army@Pasir Panjang</option>
                                    <option value = "The Salvation Army@Jurong">The Salvation Army@Jurong</option>
                                    <option value = "The Salvation Army@Mandai">The Salvation Army@Mandai</option>
                                    <option value = "PC Dreams@Sim Lim Square">PC Dreams@Sim Lim Square</option>
                                    <option value = "PC Dreams @Bugis Junction">PC Dreams @Bugis Junction</option>
                                  </select>
                                </label>
                            </MDBRow>
                            
                            {
                              /**for when your testing */
                              /**<h2>your item name is {this.state.itemName}</h2>
                            <h2>your description is {this.state.description}</h2>
                            <h2>your category is {this.state.category}</h2>
                            <h2>your item condition is {this.state.itemCondition}</h2>
                            <h2>your item location is {this.state.location}</h2>*/
                            
                            }

                          {/**<MDBInput label="Item name" type ="text" validate error="wrong" />
                          <MDBInput label="Item category" type ="text" validate error="wrong" />
                          <MDBInput type="textarea" label="Enter the item description here" rows="5" /> */}
                          {/**<h6>Select Category (Press Ctrl to select multiple options)</h6>
                          <select placeholder class="browser-default custom-select"  multiple={true} value={this.props.arrayOfOptionValues} onChange={this.multipleOptions}>
                          <option value={1}>Home and Living</option>
                          <option value={2}>Sports</option>
                          <option value={3}>Electronics</option>
                          </select> */}

                          

                          <div>
                          <h6>Upload Image</h6>
                          {this.props.loading &&
                            <div>
                                <BounceLoader 
                                    loading = {this.props.loading}
                                    size = {12}
                                    color = 'red'
                                    css = {loaderCSS}
                                    />
                            </div>
                            }
                          </div>
                          
                          <p>
                          <input type = "file" id = "imageInput" onChange = {this.handleImageChange} />
                          </p>
                          <p><img src={this.state.file} width='300' height='300'/>     </p>
                          <MDBBtn color="pink" 
                          onClick = {() => {this.handleSubmit()}}
                          disabled = {disabled}>Donate item!</MDBBtn>
                        </form>
                        </MDBCol>
                            
                    </MDBCol>
                </MDBRow>
                {/**<MDBBtn color="mdb-color" outline onPress={this.handleSubmit}>Upload </MDBBtn> */}
                {/**<button onClick = {() => {this.handleSubmit()}}>Donate item</button> */}
                
            </MDBContainer>
        </div>
        )
    }
}
const mapStateToProps = state => {
  return {
      item : state.item.items,
      uploadedItem : state.item.selectedItem,
      message : state.ui.message,
      ui : state.ui,
      loading : state.item.loading
      
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
      {uploadItemImage, donateItem, clearSelectedItem, clearMessage, clearError}
  , dispatch);


  export default connect(mapStateToProps, mapDispatchToProps)(Donation)