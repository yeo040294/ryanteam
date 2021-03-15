import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const Card = ({ post }) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src={post.imageUrl} waves />
        <MDBCardBody>
          <MDBCardTitle>{post.itemName}</MDBCardTitle>
          <MDBCardText>
            Item condition: {post.itemCondition}
            <br/>
            Item ballot status: {post.itemStatus}
            <br/>
            Posted by: {post.userHandle}
          </MDBCardText>
          <MDBBtn outline color="pink" /* href={add link to each item here  }*/>View</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;
