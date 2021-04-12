import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const Approved = ({ myRequest, navigate, collectItem }) => {
  function viewItem(itemId) {
    navigate(itemId)
  };
  let filteredData = myRequest.filter(x =>  x.approved === true && x.itemStatus != 'Rejected' && x.userHandle === localStorage.getItem("userhandle"))
  let display = filteredData.map(x => { //need to call userhandle by account 
    let tempDate = new Date(x.createdAt)
    let tempDay = tempDate.getDate()
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let tempMonth = month[tempDate.getMonth()]
    let tempYear = tempDate.getFullYear()


    return (
      <tr>
        <td>{x.itemName}</td>
        <td>{tempDay + '-' + tempMonth + '-' + tempYear}</td>
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
          <th>Date Posted</th>
          <th>Status</th>
          <th>View Item</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {(filteredData.length !== 0) ? display : <div><br /><React.Fragment>This user has yet to have any item approved at SecondLove.</React.Fragment></div>}
      </MDBTableBody>
    </MDBTable>
  );
}

export default Approved;