import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBCardHeader, MDBBadge , MDBIcon } from 'mdbreact';
import Typography from '@material-ui/core/Typography';

const Card = ({ post }) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardHeader>
          <MDBBadge color="grey">
            <MDBIcon icon="user" />
          </MDBBadge>
          <Typography variant="h5" component="h2">
            {post.userHandle}
          </Typography>
        </MDBCardHeader> 
        <MDBCardImage className="img-fluid" src={post.imageUrl} waves />
        <MDBCardBody>
          <MDBCardTitle>{post.itemName}</MDBCardTitle>
          <MDBCardText>
            Item condition: {post.itemCondition}
            <br/>
            Item ballot status: {post.itemStatus}
          </MDBCardText>
          <MDBBtn outline color="pink" /* href={add link to each item here  }*/>View</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;
