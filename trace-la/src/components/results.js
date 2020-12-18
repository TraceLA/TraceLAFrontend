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


const ResultsTable = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const resultsRes = await axios.get("/results");
        setResults(resultsRes.data);
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
            Test Results
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Result</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, indx) => (
                <TableRow key={indx}>
                  <TableCell component="th" scope="row" align="left">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">
                    {row.result ? "positive" : "negative"}
                  </TableCell>
                  <TableCell align="left">{row.date.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const ResultsGraph = () => {
  const [data, setData] = useState([]);
  const dataForGraphs = createResultsGraphData(data);

  useEffect(() => {
    const fetchAggResults = async () => {
      try {
        const res = await axios.get("/aggregateResults");
        setData(res.data);
      } catch (error) {
        console.log("error to get aggregate results, set to default");
        setData([]);
      }
    };
    fetchAggResults();
  }, []);
  

  function createResultsGraphData(data) {
    let dailyResultsData = [];
    let totalResultsData = [];
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      let curDateStr = data[i]['date'].slice(0,10);
      let curDateComponents = curDateStr.split("-")
      let curCt = parseInt(data[i]['count']);
      let utcDate = Date.UTC(parseInt(curDateComponents[0]), parseInt(curDateComponents[1])-1, parseInt(curDateComponents[2]))
      dailyResultsData.push([utcDate, curCt]);
      sum += curCt;
      totalResultsData.push([utcDate, sum]);
    }
    return {dailyResultsData: dailyResultsData, totalResultsData: totalResultsData};
  }

  const options_daily = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Daily Positive Test Results'
    },
    yAxis: {
      title: {
          text: 'Number of positive results recorded'
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
        name: "Positive Test Results",
        data: dataForGraphs['dailyResultsData']
      }
    ]
  };

  const options_total = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Cumulative Positive Test Results'
    },
    yAxis: {
      title: {
          text: 'Number of positive results recorded'
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
        name: "Positive Test Results",
        data: dataForGraphs['totalResultsData']
      }
    ]
  };

  return (
    <div style={{ display: "grid" }} className="body">  
    <div className="row">
     <HighchartsReact highcharts={Highcharts} options={options_daily} />
      </div>
      <div className="row">
      <HighchartsReact highcharts={Highcharts} options={options_total} />
      </div>
    </div>
  );
};

const ResultsVisuals = () => {
  return (
    <div style={{ display: "grid" }} className="body">  
     <ResultsGraph />
     <ResultsTable />
    </div>
  );
};

export default ResultsVisuals;
