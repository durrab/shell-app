import { getBrowserHistory, React } from 'subapp-react';
import { Router } from 'react-router-dom';
import { reduxLoadSubApp } from 'subapp-redux';
//import { GlobalStyles, reduxReducers } from '@hub/ui-lib';
import { reduxReducers as projectsReducers } from './project/reducers';
import { reduxReducers as subappMainReduces } from './reducers';
import { App } from './Main';

///...reduxReducers, 
const combinedReducers = { ...projectsReducers, ...subappMainReduces };

//<GlobalStyles />

export default reduxLoadSubApp({
  name: 'Main',
  Component: App,
  useReactRouter: true,
  reduxReducers: combinedReducers,
  reduxShareStore: true,
  StartComponent: (props) => {
    return (
      <Router history={getBrowserHistory()}>
        
        <App {...props} />
      </Router>
    );
  },
});
