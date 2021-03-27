import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from "mdbreact";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'

//Redux
import { connect } from 'react-redux';
//import { getUserData } from '../Redux/Actions/userAction';
import { unrequestItem, getRequestByUser } from '../Redux/Actions/itemAction'


class RequestSummary extends Component {

    constructor(props){
        super(props)
        this.handleUnrequest = this.handleUnrequest.bind(this)
    }
    //only ran after refresh ah
    componentDidMount(){
        this.props.getRequestByUser()
    }

    handleUnrequest(itemId){
        this.props.unrequestItem(itemId, this.props.history)
    }

    // display = this.props.user.requests.map((request) => {
    //   console.log(this.props.user.request)
    //   return (
    //     <tr>
    //       <td><img src={request.imageUrl}
    //       width = '200' height= '200' className="img-fluid"></img></td>
    //       <td><div>{request.itemName} </div></td>
    //       <td><div>{request.requestStatus} </div></td>
    //       <MDBBtn color="red" onClick={() => this.handleUnrequest(request.itemId)}>
    //                     <MDBIcon icon="ban" className="mr-1" /> Cancel request
    //                                         </MDBBtn>
    //     </tr>
    //   )
    // })
  
      render() {
        console.log("re-rendering ...")
        return (
          <MDBContainer>
                  <MDBRow>
                      <MDBCol>
                          <div>
                              <h3>Requests summary</h3>
                              <hr />
                              <MDBTable striped>
                                  <MDBTableHead>
                                      <tr>
                                          <th>RequestId</th>
                                          <th>RequestDate</th>
                                          <th>View item</th>
                                          <th>Request status</th>
                                      </tr>
                                  </MDBTableHead>
                                  <MDBTableBody>
                                      {this.props.requests.map((request) => {
                                        {console.log('hey this is the request name = ' + request.requestId)}
                                        return (
                                          <tr>
                                          <td>{request.requestId}</td>
                                          <td><div>{request.createdAt} </div></td>
                                          <td>
                                            <Link to = {`/itemDetails/${request.itemId}`}>
                                                {request.itemName}
                                            </Link>  
                                          </td>
                                          <td>{request.requestStatus}</td>
                                          <MDBBtn color="red" onClick={() => this.handleUnrequest(request.itemId)}>
                                                        <MDBIcon icon="ban" className="mr-1" /> Cancel request
                                                                            </MDBBtn>
                                                                            
                                        </tr>
                                        )
                                      })}
                                      {/*this.display*/}
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
    requests : state.item.requestList
  });
  
  RequestSummary.propTypes = {
    user: PropTypes.object.isRequired
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    { getRequestByUser, unrequestItem }
, dispatch);

  
  //export default connect(mapStateToProps)(Profile);
  export default connect(mapStateToProps, mapDispatchToProps)(RequestSummary)