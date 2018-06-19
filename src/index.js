import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import indexRoutes from "routes/index.jsx";
import ApolloClient from "apollo-boost";
import { ApolloProvider} from 'react-apollo';

import "assets/scss/material-kit-react.css?v=1.1.0";

var hist = createBrowserHistory();
const client = new ApolloClient({ uri: "https://backend-stg.medspacemarketing.com/graphql" });

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
