import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const Approve = ({ myRequest, navigate, toapprove, toreject }) => {
  function viewItem(itemId) {
    navigate(itemId)
  };

  const approve = (itemid) => {
    toapprove(itemid)
  }

  const reject = (itemid) => {
    toreject(itemid)
  }

  // console.log(myRequest)
  return (

    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>User Handle</th>
          <th>Item Details</th>
          <th>Date Donated</th>
          <th>Status</th>
          <th>Approval</th>
          <th>Rejection</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>

        { //createdat: to format time to string
          myRequest && myRequest.filter(x => x.itemStatus === "pendingApproval").map(x => {
            let tempDate = new Date(x.createdAt)
            let tempDay = tempDate.getDate()
            let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let tempMonth = month[tempDate.getMonth()]
            let tempYear = tempDate.getFullYear()

            return (
              <tr>
                <td>{x.userHandle}</td>
                <td><MDBBtn size="sm" onClick={() => viewItem(x.id)} outline color="pink">View item</MDBBtn></td>
                <td>{tempDay + '-' + tempMonth + '-' + tempYear}</td>
                <td>{x.itemStatus}</td>
                <td><MDBBtn size="sm" onClick={() => approve(x.id)} outline color="green">Approve</MDBBtn></td>
                <td><MDBBtn size="sm" onClick={() => reject(x.id)} outline color="red">Reject</MDBBtn></td>
              </tr>
            )
          })}

      </MDBTableBody>
    </MDBTable>
  );
}

export default Approve;


