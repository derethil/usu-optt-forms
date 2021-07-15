import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navbar">
      <Link to="/rubric">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  )
}

export default Navbar;