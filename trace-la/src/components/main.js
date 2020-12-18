import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import Survey from "./survey";
import Contact from "./contact";
import TermsOfService from "./terms-of-service";
import Resources from "./resources";
import HeatMap from "./map";
import Usertable from "./usertable";
import ContactsTable from "./usercontacts";
import ResultsTable from "./results";

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/survey" component={Survey}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Route exact path="/terms-of-service" component={TermsOfService}></Route>
      <Route exact path="/resources" component={Resources}></Route>
      <Route exact path="/heatmap" component={HeatMap}></Route>
      <Route exact path="/usertable" component={Usertable}></Route>
      <Route exact path="/contactstable" component={ContactsTable}></Route>
      <Route exact path="/resultstable" component={ResultsTable}></Route>
    </Switch>
  );
};

export default Main;
