import { getBrowserHistory, React } from "subapp-react";
import { reduxLoadSubApp } from "subapp-redux";
import { Router } from "react-router-dom";
import Main from "./Main";
import { placeholder } from '../commonUtils/placeholderReducer';

export default reduxLoadSubApp({
  name: "Support",
  Component: Main,
  useReactRouter: true,
  reduxReducers: {placeholder},
  reduxShareStore: true,
  StartComponent: props => {
    return (
      <Router history={getBrowserHistory()}>
        <Main {...props} />
      </Router>
    );
  }
});
