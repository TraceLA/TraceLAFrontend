import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: 1000,
    margin: "200px auto",
    background: "#ffffff",
    border: "1px solid black",
  },
});

const Usertable = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      const users = res.data;
      setUsers(users);
    });
  }, []);

  const createData = ({ first_name, last_name, email }) => {
    return { first_name, last_name, email };
  };
  const rows = users.map((v, i) => createData(v));

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Usertable;
