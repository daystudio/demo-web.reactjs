import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import { createBrowserHistory } from 'history';

const PageMain = importedComponent(
  () => import('jsx/page/Main.jsx'),
);

const history = createBrowserHistory();
// Initialize google analytics page view tracking
history.listen(location => {
});

const App = () => {
  console.log("ENV=" + process.env.NODE_ENV);
  //PageStat
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={PageMain} />
      </Switch>
    </Router>
  );
};

export default App;
