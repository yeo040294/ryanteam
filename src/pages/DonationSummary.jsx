import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../Redux/Actions/userAction';
import GoogleMap from '../components/GoogleMap';

class DonationSummary extends Component {

  componentDidMount(){
    this.props.getUserData()
  }

  display = this.props.user.items.map((item) => {
    console.log(this.props.user.items)
    return (
      <tr>
        <td><img src={item.imageUrl}
        width = '200' height= '200' className="img-fluid"></img></td>
        <td><div>{item.itemName} </div></td>
        <td><div>{item.itemStatus} </div></td>
      </tr>
    )
  })

    render() {
      return (
        <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div>
                            <MDBRow>
                              <MDBCol md = '8'><h3>Donation summary</h3></MDBCol>
                              <MDBCol md = '3'><Link to = "/profile">
                              <MDBBtn color="pink">Back to profile</MDBBtn>
                            </Link></MDBCol>
                            
                            </MDBRow>
                            
                            <hr />
                            <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Item name</th>
                                        <th>Item status</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {this.display}
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
      )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
  });
  
  DonationSummary.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getUserData }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(DonationSummary)