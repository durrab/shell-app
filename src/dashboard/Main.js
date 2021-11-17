import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
//import { reportUser, setCurrentProduct, UnknownError } from '@hub/ui-lib';
import { ProjectDashboard } from './pages/dashboard';

const Main = () => {
  const dispatch = useDispatch();
  const micrositeId = 'hub-dashboard';

  useEffect(() => {
   // reportUser(micrositeId);
    // main subapp takes care of product in routesConfig(/src/common/Routes.js).
    // For subapp without a productId, an Ad Hoc id can be assigned, such as this:
   // dispatch(setCurrentProduct({ id: micrositeId })); // Let 'Hub Shell' know about the loaded microsite
  }, []);

  return (
  
      <div className='app-content' style={{ margin: 'unset' }}>
        <Switch>
          <Route path='/dashboard' exact component={ProjectDashboard} />
        </Switch>
      </div>
   
  );
};

export default Main;
