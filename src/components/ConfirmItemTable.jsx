import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const ConfirmItemTable = ({ navigate, myRequest, toConfirm, toReject, refresh}) => {
 
  function viewItem(itemId) {
    navigate(itemId)
  };
  const confirmItem = (itemid) => {
    toConfirm(itemid)
    refresh()
  }

  const rejectItem = (itemid) => {
    toReject(itemid)
    refresh()
  }

  // console.log(myRequest)
  return (

    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>UserHandle</th>
          <th>Item details</th>
          <th>Reserved date</th>
          <th>Status</th>
          <th>Confirm donation</th>
          <th>Unreserve item</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>

        { //createdat: to format time to string
          myRequest && myRequest.filter(x => x.status === "pendingCollection").map(x => {
            let tempDate = new Date(x.createdAt)
            let tempDay = tempDate.getDate()
            let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let tempMonth = month[tempDate.getMonth()]
            let tempYear = tempDate.getFullYear()

            return (
              <tr>
                <td>{x.userHandle}</td>
                {/**<td>{x.itemId}</td> */}
                <td><MDBBtn size="sm" onClick={() => viewItem(x.itemId)} outline color="pink">View item</MDBBtn></td>
                <td>{tempDay + '-' + tempMonth + '-' + tempYear}</td>
                <td>{x.status}</td>
                <td><MDBBtn size="sm" onClick={() => confirmItem(x.itemId)} outline color="green">Confirm donation</MDBBtn></td>
                <td><MDBBtn size="sm" onClick={() => rejectItem(x.itemId)} outline color="red">Un-reserve item</MDBBtn></td>
              </tr>
            )
          })}

      </MDBTableBody>
    </MDBTable>
  );
}

export default ConfirmItemTable;


