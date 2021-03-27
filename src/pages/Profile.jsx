import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBBtn, MDBCardImage} from 'mdbreact'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../Redux/Actions/userAction';
import GoogleMap from '../components/GoogleMap';

class Profile extends Component {

  componentDidMount(){
    //this.props.getUserData()
    //console.log(this.props.user.credentials)
  }

    render() {
      return (
        <MDBContainer>
          <MDBRow>

              <MDBCol>
                <h2>User information</h2>
                <MDBCol col-md-1>
                  <h3>logged in as: {this.props.user.credentials.handle}</h3>
                  <MDBRow>
                    <Link to = "/profile/donationSummary">
                      <MDBBtn color="pink">View your donations</MDBBtn>
                    </Link>
                  </MDBRow>
                  <MDBRow>
                    <Link to = "/profile/requestSummary">
                    <MDBBtn color="pink">View your request summary</MDBBtn>
                    </Link>
                  </MDBRow>
                </MDBCol>
              </MDBCol>

              <MDBCol>
                <h2></h2>
                <h3></h3>
                <MDBCardImage className="img-fluid" src={this.props.user.credentials.imageUrl} waves />
              </MDBCol>
                
          </MDBRow>

      </MDBContainer>
      )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
  });
  
  Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getUserData }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)