import React, { Fragment } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

const ButtonPage = () => {
  return (
    <Fragment>
      <MDBBtn color="primary">
        <MDBIcon icon="utensils" className="mr-1" /> Kitchen
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="bicycle" className="ml-1" /> Sports
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="laptop" className="mr-1" /> Electronic
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="gamepad" className="mr-1" /> Toys
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="tshirt" className="mr-1" /> Clothes
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="gem" className="mr-1" /> Luxury
      </MDBBtn>

      <MDBBtn color="primary">
        <MDBIcon icon="car-side" className="mr-1" /> Automobile
      </MDBBtn>
      
    </Fragment>
  );
}

export default ButtonPage;