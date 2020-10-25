import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Home from './home';
import Survey from './survey';
import Contact from './contact';
import TermsOfService from './terms-of-service';
import Resources from './resources';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
      <Route exact path='/survey' component={Survey}></Route>
      <Route exact path='/contact' component={Contact}></Route>
      <Route exact path='/terms-of-service' component={TermsOfService}></Route>
      <Route exact path='/resources' component={Resources}></Route>
    </Switch>
  );
}


export default Main;