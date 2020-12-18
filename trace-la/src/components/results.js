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

export default ResultsTable;
