import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Login = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        
        <div className="grey-text">
          <MDBInput label="Type your username" icon="user-alt" group type="email" validate error="wrong"
            success="right" />
          <MDBInput label="Type your password" icon="lock" group type="password" validate />
        </div>
        <div className="text-center">
            <MDBBtn color = "blue-grey" size = "lg">Sign Up</MDBBtn>
          <MDBBtn color = "red" size = "lg">Login</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default Login;