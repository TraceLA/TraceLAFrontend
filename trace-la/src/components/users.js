import React, { useEffect, useState } from "react";
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

const Usertable = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const usersRes = await axios.get("/users");
        setUsers(usersRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTable();
  }, []);

  const createData = ({ first_name, last_name, email }) => {
    return { first_name, last_name, email };
  };

  const rows = users.map((v, i) => createData(v));

  return (
    <div style={{ display: "grid" }} className="body">  
      <div className="row">
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="left">
                {row.first_name}
              </TableCell>
              <TableCell align="left">{row.last_name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default Usertable;
