import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const ConfirmItemTable = ({ myRequest, toConfirm, toReject, refresh}) => {
 
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
          <th>Item Id</th>
          <th>Created at</th>
          <th>Status</th>
          <th>Confirm donation</th>
          <th>Unreserve item</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>

        { //createdat: to format time to string
          myRequest && myRequest.filter(x => x.status === "pendingCollection").map(x => {
            return (
              <tr>
                <td>{x.userHandle}</td>
                <td>{x.itemId}</td>
                <td>{x.createdAt}</td>
                <td>{x.status}</td>
                <td><MDBBtn size="sm" onClick={() => confirmItem(x.itemId)} outline color="pink">Confirm donation</MDBBtn></td>
                <td><MDBBtn size="sm" onClick={() => rejectItem(x.itemId)} outline color="pink">Un-reserve item</MDBBtn></td>
              </tr>
            )
          })}

      </MDBTableBody>
    </MDBTable>
  );
}

export default ConfirmItemTable;


