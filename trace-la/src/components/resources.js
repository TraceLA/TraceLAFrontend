import React from "react";
import "../styles/layout.css";

const Resources = () => {
  return (
    <div className="body">
      <h1>Resource Links:</h1>
      <div>
      <a
            className="link"
            href="https://www.uclahealth.org/coronavirus"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>UCLA Health</h3>
            <h5>UCLA Health's updates on COIVD-19 and other information related to COVID-19.</h5>
          </div>
      </a><br/>
      <a
            className="link"
            href="https://covid.cdc.gov/covid-data-tracker/?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fcases-updates%2Fcases-in-us.html#cases_casesper100klast7days"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>CDC</h3>
            <h5>Centers for Disease Control and Prevention's map of United States and the state's total cases within the past 7 days and their 
                statistics.
            </h5>
          </div>
      </a><br/>
      <a
            className="link"
            href="https://covid19.ca.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>CA Government</h3>
            <h5>The number of cases, deaths, and tests within California. Can search related information within each county.</h5>
          </div>
      </a><br/>
      <a
            className="link"
            href="https://corona-virus.la/staying-healthy-through-flu-season-during-covid-19"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>Free Flu Vaccinations</h3>
            <h5>The City and USC's School of Pharmacy has partnered to provide free flu vaccionations at various locations within the city.</h5>
          </div>
      </a><br/>
      <a
            className="link"
            href="https://www.yourbenefits.laclrs.org/ybn/Index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>LA County Department of Public Social Services</h3>
            <h5>Access all that the LA County Department of Public Social Services provides here for those who qualify.</h5>
          </div>
      </a><br/>
      <a
            className="link"
            href="https://corona-virus.la/covid-19-testing"
            target="_blank"
            rel="noopener noreferrer"
          >
          <div>
            <h3 style={{textDecoration: "underline"}}>Free COVID-19 Testing</h3>
            <h5>The City of Los Angeles, in partnership with Curative Inc. and CORE (Community Organized Relief Effort), 
              is providing free COVID-19 testing to ALL Los Angeles County residents, whether or not you are experiencing COVID-19 symptoms.</h5>
          </div>
      </a>
      </div>
    </div>
  );
};

export default Resources;
