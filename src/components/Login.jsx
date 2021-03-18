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
        <p class="card-text">Click here to </p>
        <p class="card-text">
            <a href="http://localhost:3000/signup" class="stretched-link">Sign Up</a>
            </p>
          <MDBBtn color = "red" size = "lg">Login</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default Login;