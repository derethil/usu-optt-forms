import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
color: blue;
`;

const App = () => {
  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/2">Page 2</Link>
      </div>

      <Switch>

        <Route exact path="/">
          <Title>Page one!</Title>
        </Route>

        <Route exact path="/2">
          <Title>Page two!</Title>
        </Route>

        <Route>
          <Title>404 Not Found</Title>
        </Route>

      </Switch>

    </BrowserRouter>
  )
}

const RootComponent = () => {
  return <App />
}

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);