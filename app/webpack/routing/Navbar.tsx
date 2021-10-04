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

type Routes = {
  [key in formOptions]: JSX.Element[];
};

type Endpoint = {
  name: string;
  endpoint: string;
};

type Endpoints = {
  [key in formOptions]: Endpoint[];
};

const generateLinks = (allRoutes: Routes): JSX.Element[] => {
  const getEndpoints = (formRoutes: JSX.Element[]): Endpoint[] => {
    const dynamicEndpoints = formRoutes.map((route) => {
      return { name: String(route.key), endpoint: route.props["path"] };
    });

    return [
      { name: "Home", endpoint: "/" },
      { name: "Rubric", endpoint: "/rubric" },
      ...dynamicEndpoints,
      { name: "Feedback", endpoint: "/feedback" },
    ];
  };

  const endpoints: Endpoints = {
    [formOptions.studentTeaching]: getEndpoints(
      allRoutes[formOptions.studentTeaching]
    ),
    [formOptions.severePracticum]: getEndpoints(
      allRoutes[formOptions.severePracticum]
    ),
    [formOptions.bTo5Practicum]: getEndpoints(
      allRoutes[formOptions.bTo5Practicum]
    ),
    [formOptions.reading]: getEndpoints(allRoutes[formOptions.reading]),
    [formOptions.math]: getEndpoints(allRoutes[formOptions.math]),
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

type Props = {
  studentTeacher: string;
  dynamicRoutes: Routes;
};

const Navbar = (props: Props) => {
  const links = generateLinks(props.dynamicRoutes);

  return (
    <NavbarContainer>
      {...links}

      <StudentDisplay>{props.studentTeacher}</StudentDisplay>
    </NavbarContainer>
  );
};

export default Navbar;
