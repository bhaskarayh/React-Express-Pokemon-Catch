import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import logo from "../assets/pokeball.png";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    // <Navbar bg="light" expand="lg">
    //   <Navbar.Brand href="/">Pokémon App</Navbar.Brand>
    //   <Nav className="mr-auto">
    //     <Button variant="outline-primary" onClick={() => navigate(-1)}>
    //       Back
    //     </Button>
    //   </Nav>
    // </Navbar>

    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Pokémon App
        </Navbar.Brand>
        {location.pathname === "/" ? (
          ""
        ) : (
          <Nav className="mr-auto">
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
