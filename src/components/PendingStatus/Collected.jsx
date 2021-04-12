import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

const Collected = ({ myRequest, navigate,collectItem }) => {
  function viewItem(itemId){
    navigate(itemId)
  };

  let filteredData = myRequest.filter(x => x.status === 'Collected' && x.userId === localStorage.getItem("userid"))
  let display = filteredData.map(x => {
          
    let tempDate = new Date(x.createdAt)
    let tempDay = tempDate.getDate()
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let tempMonth = month[tempDate.getMonth()]
    let tempYear = tempDate.getFullYear()

    return (
      <tr>
        <td>{x.itemId}</td>
        <td>{tempDay + '-' + tempMonth + '-' + tempYear}</td>
        <td>{x.status}</td>
        <td><MDBBtn size="sm" onClick={() => viewItem(x.itemId)} outline color="pink">View Item</MDBBtn></td>
      </tr>
    )
  })

  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>Item ID</th>
          <th>Date Posted</th>
          <th>Status</th>
          <th>View Item</th>
        </tr>
      </MDBTableHead>
     
      <MDBTableBody>
      {(filteredData.length !== 0) ? display : <div><br /><React.Fragment>This user has yet to collect any item in SecondLove.</React.Fragment></div>}
      
         </MDBTableBody>
    </MDBTable>
  );
}

export default Collected;