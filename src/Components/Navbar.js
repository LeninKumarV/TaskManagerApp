import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar" style={{ width: "100%" }}>
      <nav
        className="navbar bg-dark  border-bottom-dark"
        data-bs-theme="dark"
        style={{ width: "100%", position: "fixed", top: "0%",left:"0%",right:"0%" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">Task Management</Link>
          <Link className="btn btn-outline-success" to="/login">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
