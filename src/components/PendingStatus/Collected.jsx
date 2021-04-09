import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const Collected = ({ myRequest, navigate,collectItem }) => {
  function viewItem(itemId){
    navigate(itemId)
  };

  console.log(myRequest);
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>Item ID</th>
          <th>Date Requested</th>
          <th>Status</th>
          <th>View Item</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        
        {myRequest && myRequest.filter(x => x.status === 'Collected' && x.userId === localStorage.getItem("userid")).map(x => {
          return (
            <tr>
              <td>{x.itemId}</td>
              <td>{x.createdAt}</td>
              <td>{x.status}</td>
              <td><MDBBtn size="sm" onClick={() => viewItem(x.itemId)} outline color="pink">View Item</MDBBtn></td>
            </tr>
          )
        })}

      </MDBTableBody>
      <MDBTableBody>
        {/** {(filteredData.length !== 0) ? display : <React.Fragment>There are currently no items collected by user.</React.Fragment>}
     */}
         </MDBTableBody>
    </MDBTable>
  );
}

export default Collected;