import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const ProfileTableDonated = ({ myRequest, navigate, userHandle}) => {
  function viewItem(itemId) {
    navigate(itemId)
  };
  let filteredData = []
  let display

    filteredData = myRequest.filter(x =>  x.approved === true && x.itemStatus != 'Rejected' && x.userHandle === userHandle)
    display = filteredData.map(x => { 
        return (
          <tr>
            <td>{x.itemName}</td>
            <td>{x.createdAt}</td>
            <td>{x.itemStatus}</td>
            <td><MDBBtn size="sm" onClick={() => viewItem(x.id)} outline color="pink">View Item</MDBBtn></td>
          </tr>
        )
      })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>Item Name</th>
          <th>Date Requested</th>
          <th>Status</th>
          <th>View Item</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {(filteredData.length !== 0) ? display : <React.Fragment>No Data</React.Fragment>}
      </MDBTableBody>
    </MDBTable>
  );
}

export default ProfileTableDonated;