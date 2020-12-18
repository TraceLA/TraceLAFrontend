import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAggResults = async () => {
      try {
        const res = await axios.get("/aggregateContacts");
        setData(res.data);
      } catch (error) {
        console.log("error to get aggregate results, set to default");
        setData([]);
      }
    };
    fetchAggResults();
  }, []);
  

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
        data: createContactsGraphData(data)
      }
    ]
  };

  return (
    <div style={{ display: "grid" }} className="body">  
    <div className="row">
     <HighchartsReact highcharts={Highcharts} options={options} />
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
