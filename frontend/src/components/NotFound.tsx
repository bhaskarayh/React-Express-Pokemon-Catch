import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div
      className="container text-center d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary w-lg-25">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
