import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ProtectedRoute } from "./routing /ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { FormSTO } from "./pages/FormSTO";
import { NotFound } from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={FormSTO} />
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