import { getBrowserHistory, React } from "subapp-react";
import { reduxLoadSubApp } from "subapp-redux";
import { Router } from "react-router-dom";
import Main from "./Main";
import { placeholder } from '../commonUtils/placeholderReducer';

// TODO: Get routing to other subapps from dashboard working
export default reduxLoadSubApp({
  name: "Dashboard",
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
  },
  prepare: async () => {
   return {message:"Durrab"}
  }
});
