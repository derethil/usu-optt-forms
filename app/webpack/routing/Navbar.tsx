import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import Color from "../styledComponents/colors";
import currentForm from "../currentForm";

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
  /* border-bottom: 0.5em solid ${Color.lights.white}; */
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

  :hover,
  &.${activeClassName} {
    background-color: ${Color.blues.blueDark};
    color: ${Color.blues.blueLight};
  }
`;

const generateLinks = (): JSX.Element[] => {
  const differentPages = -{
    studentTeaching: ["data2"],
  };

  const endpoints = [
    { name: "Home", endpoint: "/" },
    { name: "Data 1", endpoint: "/data1" },
    { name: "Rubric", endpoint: "/rubric" },
    { name: "Feedback", endpoint: "/feedback" },
  ];

  if (currentForm === "studentTeaching") {
    endpoints.splice(2, 0, { name: "Data 2", endpoint: "/data2" });
  }

  const links = endpoints.map(({ name, endpoint }, index) => {
    return (
      <StyledLink activeClassName={activeClassName} to={endpoint} key={index}>
        {name}
      </StyledLink>
    );
  });

  return links;
};

const Navbar = (props: { studentTeacher: string }) => {
  const links = generateLinks();

  return (
    <NavbarContainer>
      {...links}

      <StudentDisplay>{props.studentTeacher}</StudentDisplay>
    </NavbarContainer>
  );
};

export default Navbar;
