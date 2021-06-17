import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
  public render() {
    let redirectPath: string = '';
    if (!this.props.isAuthenticated) {
      redirectPath = this.props.authenticationPath;
    }

    if (redirectPath) {
      const redirectComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
      return <Route {...this.props} component={redirectComponent} />;
    } else {
      return <Route {...this.props} />;
    }
  }
}