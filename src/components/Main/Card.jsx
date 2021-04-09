import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBCardHeader, MDBBadge, MDBIcon, MDBRow, MDBFooter } from 'mdbreact';
import {Link} from 'react-router-dom'
const Card = ({ post, viewItem }) => {

  const dateNow = new Date().toISOString()

  const compareDatesByDays = (higherDate, lowerDate)=>{
    const d1 = new Date(higherDate);
    const d2 = new Date(lowerDate);
    const diffTime = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000*60*60))
    return diffHours > 24 ? diffDays+' days' : diffHours+' hours';
  }
  
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem", height : '33rem' }}>
        <MDBCardHeader>
          <MDBRow>
            <MDBIcon border='' icon="user" style={{ padding: '10px' }} />
            <h5 style={{ padding: '5px' }}><Link to = {`/profile/${post.userId}`}>{post.userHandle}</Link></h5>
          </MDBRow>
        </MDBCardHeader>
        <Link to = {`/itemdetails/${post.id}`}>
          <MDBCardImage 
            className="img-fluid" 
            src={post.imageUrl} 
            zoom
            style = {{height : '20rem'}}
            />
        </Link>
        
        <MDBCardBody>
          <MDBCardTitle>{post.itemName}</MDBCardTitle>
          <MDBCardText>
            Item condition: {post.itemCondition}
            <br />
            Posted {compareDatesByDays(dateNow,post.createdAt)} ago
            {/* Item id: {post.itemId} */}
          </MDBCardText>

        {/**
         * <MDBBtn outline color="pink" onClick={() => viewItem(post.id)}>View</MDBBtn>
         */}
        </MDBCardBody>
      </MDBCard>
      <br />
    </MDBCol>
  )
}

export default Card;
