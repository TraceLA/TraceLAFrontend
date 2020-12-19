import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import ActivityVisuals from "./activity";
import Usertable from "./users";
import ContactsVisuals from "./contacts";
import ResultsVisual from "./results";
import TagsChart from "./tags"

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/activity" component={ActivityVisuals}></Route>
      <Route exact path="/users" component={Usertable}></Route>
      <Route exact path="/contacts" component={ContactsVisuals}></Route>
      <Route exact path="/results" component={ResultsVisual}></Route>
      <Route exact path="/tags" component={TagsChart}></Route>
    </Switch>
  );
};

export default Main;
