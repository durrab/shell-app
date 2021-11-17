import React from "react";
import { Route, Router } from "react-router-dom";
import { getBrowserHistory } from "subapp-react";
import { reduxLoadSubApp } from 'subapp-redux';

import Main from "./Main";
import { placeholder } from '../commonUtils/placeholderReducer';

export default reduxLoadSubApp({
  name: "Marketplace",
  Component: Main,
  useReactRouter: true,
  reduxReducers: {placeholder},
  reduxShareStore: true,
  StartComponent: props => {
    return (
      <Router history={getBrowserHistory()}>
        <Route path="/marketplace"><Main {...props} /></Route>
      </Router>
    );
  }
});
