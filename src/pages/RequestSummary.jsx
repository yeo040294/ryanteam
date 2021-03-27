import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../Redux/Actions/userAction';
import { unrequestItem } from '../Redux/Actions/itemAction'
import GoogleMap from '../components/GoogleMap';

class RequestSummary extends Component {

    constructor(props){
        super(props)
        this.handleUnrequest = this.handleUnrequest.bind(this)
    }

    componentDidMount(){
        this.props.getUserData()
    }

    handleUnrequest(itemId){
        this.props.unrequestItem(itemId)
    }

    display = this.props.user.requests.map((request) => {
      console.log(this.props.user.request)
      return (
        <tr>
          <td><img src={request.imageUrl}
          width = '200' height= '200' className="img-fluid"></img></td>
          <td><div>{request.itemName} </div></td>
          <td><div>{request.requestStatus} </div></td>
          <MDBBtn color="success" onClick={() => this.handleUnrequest(request.itemId)}>
                        <MDBIcon icon="check" className="mr-1" /> Cancel request
                                            </MDBBtn>
        </tr>
      )
    })
  
      render() {
        return (
          <MDBContainer>
                  <MDBRow>
                      <MDBCol>
                          <div>
                              <h3>Request summary</h3>
                              <hr />
                              <MDBTable striped>
                                  <MDBTableHead>
                                      <tr>
                                          <th>Picture</th>
                                          <th>Item name</th>
                                          <th>Request status</th>
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
  
  RequestSummary.propTypes = {
    user: PropTypes.object.isRequired
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getUserData, unrequestItem }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(RequestSummary)