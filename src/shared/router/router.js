import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FbTools from '../../modules/facebook-tools/facebook-tools.js';
import ActivityMonitor from '../../modules/activity-monitor/activity-monitor';
import Settings from '../../modules/app-settings/app-settings';
import Home from '../../modules/home/home';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/business-tools' component={FbTools} />
      <Route path='/activity-monitor' component={ActivityMonitor} />
      <Route path='/settings' component={Settings} />
    </Switch>
  );
};

export default Router;
