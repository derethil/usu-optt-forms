import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { Color } from "../styledComponents/colors";

const activeClassName = "active";

const NavbarContainer = styled.nav`
  z-index: 999;
  display: flex;
  position: sticky;
  top: 0;
  width: 100vw;
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
  font-size: 1.3em;
  background-color: ${Color.blues.blueDarker};
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
  border-bottom: 0.5em solid ${Color.lights.white};
`;

const StudentDisplay = styled.div`
  display: inline-block;
  color: ${Color.lights.light};
  padding: 1.5rem;
  margin-left: auto;
  margin-right: 1em;
`;

const StyledLink = styled(NavLink)`
  display: inline-block;

  color: ${Color.lights.light};
  padding: 1.5rem;

  text-decoration: none;

  transition: 0.2s all ease;

  :hover, &.${activeClassName} {
    background-color: ${Color.blues.blueDark};
    color: ${Color.blues.blueLight};
  }
`;

const Navbar = (props: { studentTeacher: string }) => {
  return (
    <NavbarContainer>
      <StyledLink activeClassName={activeClassName} exact to="/">Home</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/rubric">Rubric</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/feedback">Feedback</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/data1">Data 1</StyledLink>
      <StyledLink activeClassName={activeClassName} to="/data2">Data 2</StyledLink>

      <StudentDisplay>
        {props.studentTeacher}
      </StudentDisplay>
    </NavbarContainer>
  )
}

export default Navbar;