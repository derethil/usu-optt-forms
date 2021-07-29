import React from "react";
import styled from "styled-components";

import { Link, NavLink } from "react-router-dom";
import { Color } from "../styledComponents/style";

const NavbarContainer = styled.div`
  background-color: ${Color.blues.primary};
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
  font-size: 1.3em;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
`;

const activeClassName = "active";

const StyledLink = styled(NavLink)`
  display: inline-block;

  color: ${Color.lights.light};
  padding: 1.5rem;

  text-decoration: none;

  transition: 0.2s all ease;

  :hover, &.${activeClassName} {
    background-color: ${Color.blues.blueDark};
    color: ${Color.blues.blueLight}
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <StyledLink activeClassName={activeClassName} exact to="/">Home</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/rubric">Rubric</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/feedback">Feedback</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/data1">Data 1</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/data2">Data 2</StyledLink>
    </NavbarContainer>
  )
}

export default Navbar;