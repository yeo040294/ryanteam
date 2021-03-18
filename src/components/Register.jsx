import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Register = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        
        <div className="grey-text">
          <MDBInput label="Username" icon="user-alt" group type="email" validate error="wrong"
            success="right" />
            <MDBInput label="Email Address" icon="envelope" group type="email" validate error="wrong"
            success="right" />
          <MDBInput label="Password" icon="lock" group type="password" validate />
          <MDBInput label="Confirmed Password" icon="lock" group type="password" validate />
        </div>
        <div className="text-center">
          <MDBBtn color = "red" size = "lg" href = "#">Sign Up</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default Register;