import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import Color from "../styledComponents/colors";
import currentForm, { formOptions } from "../currentForm";

// ---------- STYLES ----------

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

// ---------- LINK GENERATION ----------

type Endpoint = {
  name: string;
  endpoint: string;
};

type Endpoints = {
  [key in formOptions]: Endpoint[];
};

const generateLinks = (): JSX.Element[] => {
  const wrapEndpoints = (endpoints: Endpoint[]): Endpoint[] => {
    return [
      { name: "Home", endpoint: "/" },
      ...endpoints,
      { name: "Rubric", endpoint: "/rubric" },
      { name: "Feedback", endpoint: "/feedback" },
    ];
  };

  const endpoints: Endpoints = {
    [formOptions.studentTeaching]: wrapEndpoints([
      { name: "Data 1", endpoint: "/data1" },
      { name: "Data 2", endpoint: "/data2" },
    ]),
    [formOptions.severePracticum]: wrapEndpoints([
      { name: "Data", endpoint: "/data" },
    ]),
    [formOptions.bTo5Practicum]: wrapEndpoints([
      { name: "Data", endpoint: "/data" },
    ]),
    [formOptions.reading]: wrapEndpoints([
      { name: "Decoding Data", endpoint: "/decoding" },
      { name: "Story Reading Data", endpoint: "/reading" },
    ]),
    [formOptions.math]: wrapEndpoints([
      { name: "Opening", endpoint: "/opening" },
      { name: "Independent Practice", endpoint: "/independent" },
      { name: "New Material - Guided Practice", endpoint: "/guided" },
    ]),
  };

  // ---------- REACT COMPONENT ----------

  const links = endpoints[currentForm].map(({ name, endpoint }, index) => {
    return (
      <StyledLink
        activeClassName={activeClassName}
        to={endpoint}
        key={index}
        exact
      >
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
