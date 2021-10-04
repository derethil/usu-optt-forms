import React, { Props } from "react";
import { Route } from "react-router-dom";

type FormRouteProps = Route["props"] & {
  name: string;
};

const FormRoute = (props: FormRouteProps) => {
  return <Route {...props}>{props.children}</Route>;
};

export default FormRoute;
