import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Home from './home';
import Survey from './survey';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
      <Route exact path='/survey' component={Survey}></Route>
    </Switch>
  );
}


export default Main;