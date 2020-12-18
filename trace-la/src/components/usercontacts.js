import React, { useEffect, useState} from "react";
import axios from "axios";
import "../styles/ToolPageStyles.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import bellcurve from "highcharts/modules/histogram-bellcurve";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    width: "45vw",
    background: "#ffffff",
    border: "1px solid black",
  },
  tableTitle: {
    paddingLeft: 7,
  },
});

const ContactsTable = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const contactsRes = await axios.get("/contacts");
        setContacts(contactsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);


  return (
    <div style={{ display: "grid" }} className="body">  
      <div className="row">
        <TableContainer component={Paper} className={classes.container}>
          <Typography variant="h6" className={classes.tableTitle}>
            Contact History
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Contact with</TableCell>
                <TableCell align="left">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row, indx) => (
                <TableRow key={indx}>
                  <TableCell component="th" scope="row" align="left">
                    {row.own_username}
                  </TableCell>
                  <TableCell align="left">{row.other_username}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
    </div>
  );
};


const ContactsGraph = () => {
  const [dailyData, setDailyData] = useState([]);
  const [distrData, setDistrData] = useState([]);

  useEffect(() => {
    const fetchAggResults = async () => {
      try {
        const daily = await axios.get("/aggregateContactsByDate");
        setDailyData(daily.data);
        const distr = await axios.get("/numContactsDistribution");
        setDistrData(distr.data);
      } catch (error) {
        console.log("error to get aggregate results, set to default");
        setDailyData([]);
        setDistrData([]);
      }
    };
    fetchAggResults();
  }, []);
  

  function createHistogramData(data) {
    let histoData = [];
    for (let i = 0; i < data.length; i++) {
      let sum = parseInt(data[i]['sum']);
      let ct = parseInt(data[i]['count']);
      let additional = Array(ct).fill(sum);
      console.log(additional)
      histoData = histoData.concat(additional);
    }
    console.log("Histo data")
    console.log(histoData)
    return histoData;
  }

  function createContactsGraphData(data) {
    let contactsData = [];
    for (let i = 0; i < data.length; i++) {
      let curDateStr = data[i]['date'].slice(0,10);
      let curDateComponents = curDateStr.split("-")
      let curCt = parseInt(data[i]['count']);
      contactsData.push([Date.UTC(parseInt(curDateComponents[0]), parseInt(curDateComponents[1])-1, parseInt(curDateComponents[2])), curCt]);
    }
    return contactsData;
  }

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'User Contacts'
    },
    yAxis: {
      title: {
          text: 'Number of contacts recorded'
      },
      min: 0
  },
    xAxis: {
      type: 'datetime',
      title: {
          text: 'Date'
      }
  },
    series: [
      {
        name: "Contacts per day",
        data: createContactsGraphData(dailyData)
      }
    ]
  };

  const optionsHisto = 
    {
      title: {
          text: 'Distribution of Number of Contacts Per User'
      },
  
      xAxis: [{
          title: { text: 'Number of Contacts' },
          alignTicks: false
      }, {
          title: { text: '' },
          alignTicks: false,
          opposite: true
      }],
  
      yAxis: [{
          title: { text: 'Number of Users' }
      }, {
          title: { text: '' },
          opposite: true
      }],
  
      plotOptions: {
          histogram: {
              accessibility: {
                  pointDescriptionFormatter: function (point) {
                      var ix = point.index + 1,
                          x1 = point.x.toFixed(3),
                          x2 = point.x2.toFixed(3),
                          val = point.y;
                      return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                  }
              }
          }
      },
  
      series: [{
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1
    }, {
        type: 'scatter',
        data: createHistogramData(distrData)
    }]
  };

  return (
    <div style={{ display: "grid" }} className="body">  
    <div className="row">
     <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="row">

      <HighchartsReact highcharts={bellcurve(Highcharts)} options={optionsHisto} />
      </div>
      
    </div>
  );
};

const ContactsVisuals = () => {
  return (
    <div style={{ display: "grid" }} className="body">  
    <ContactsGraph />
     <ContactsTable />
    </div>
  );
};



export default ContactsVisuals;
