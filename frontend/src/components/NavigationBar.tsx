import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import logo from "../assets/pokeball.png";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar className="navbar navbar-dark bg-primary fixed-top">
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

        <Nav className="ms-auto d-flex gap-3 align-items-center">
          <div className="nav-item">
            <Link to="/my-pokemon" className="nav-link text-white">
              My Pokemon
            </Link>
          </div>
          {location.pathname === "/" ? (
            ""
          ) : (
            <Button variant="light" onClick={() => navigate(-1)}>
              Back
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
