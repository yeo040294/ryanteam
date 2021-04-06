import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const ProfileTableCollected = ({ myRequest, navigate, userId}) => {
  function viewItem(itemId) {
    navigate(itemId)
  };
  let filteredData = []
  let display

    filteredData = myRequest.filter(x => x.status != 'notCollected' && x.userId === userId)
    display = filteredData.map(x => { 
        return (
          <tr>
            <td>{x.itemId}</td>
            <td>{x.createdAt}</td>
            <td>{x.status}</td>
            <td><MDBBtn size="sm" onClick={() => viewItem(x.id)} outline color="pink">View Item</MDBBtn></td>
          </tr>
        )
      })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
            <th>ItemId</th>
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

export default ProfileTableCollected;