import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { FormSTO } from "./pages/FormSTO";
import { NotFound } from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={FormSTO} />
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