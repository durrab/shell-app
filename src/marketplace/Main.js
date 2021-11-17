import React, { useEffect } from "react";
//import { reportUser, setCurrentProduct, UnknownError } from "@hub/ui-lib";
import { Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';

import Marketplace from "./Marketplace";

const Main = (props) => {
  const dispatch = useDispatch();
  const micrositeId = "hub-home";

  useEffect(() => {
   // reportUser(micrositeId);
    // main subapp takes care of product in routesConfig(/src/common/Routes.js).
    // For subapp without a productId, an Ad Hoc id can be assigned, such as this:
   // dispatch(setCurrentProduct({id: micrositeId})); // Let "Hub Shell" know about the loaded microsite
  }, []);

  return (
    <ErrorBoundary FallbackComponent={<div>Failed</div>}>
      <Route path="/marketplace" exact component={Marketplace} {...props} />
    </ErrorBoundary>
  );
};

export default Main;
