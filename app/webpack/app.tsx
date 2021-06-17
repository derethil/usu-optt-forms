import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Navbar } from "./components/navbar";
import { ProtectedRoute } from "./routing /protectedRoute";
import { Dashboard } from "./pages/dashboard";
import { STOForm } from "./pages/stoform";
import { NotFound } from "./pages/notfound";

const Title = styled.h1`
  color: inherit;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={STOForm} />
        <ProtectedRoute isAuthenticated={true} authenticationPath="/" exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

const RootComponent = () => {
  return <Router />
}

const entry = document.getElementById("app-root");
ReactDom.render(<RootComponent />, entry);