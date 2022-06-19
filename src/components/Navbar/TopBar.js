import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export const TopBar = () => {
  return (
    <Navbar
      style={{ backgroundColor: "black", justifyContent: "space-between" }}
      expand="lg"
    >
      <Navbar.Brand
        style={{
          color: "#FFFFFF",
          padding: "10px 10px",
          margin: "20px",
        }}
        href="/tags"
      >
        Etiquetador
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Nav
        style={{
          padding: "10px 10px",
          margin: "20px",
        }}
      >
        <Link to="/login">
          {" "}
          <FaRegUserCircle color="white" size="35px" />
        </Link>
      </Nav>
    </Navbar>
  );
};
