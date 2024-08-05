import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              Built with ❤️ by Bhaskara Yudhistira Hoetomo. &copy;{" "}
              {new Date().getFullYear()} Pokémon App. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
