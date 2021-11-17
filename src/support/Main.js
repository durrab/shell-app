import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { P1SupportProductList, PageOnCallForm } from './pages';

const Main = () => {
  const micrositeId = 'hub-support';

 

  return (
    <ErrorBoundary FallbackComponent={<div>Error</div>}>
      <div className='app-content' style={{ margin: 'unset' }}>
        <Switch>
          <Route path='/support' exact component={P1SupportProductList} />
          <Route path='/support/oncallpager' exact component={PageOnCallForm} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
};

export default Main;
