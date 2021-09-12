import { Box, Button } from "@material-ui/core";
import { changeColorMark, changeCustomText } from "../../../utils/common";

import Paper from "@material-ui/core/Paper";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  buttonActions: {
    marginLeft: theme.spacing(2),
  },
}));

export default function StudentRankingList({ studentList, listCity }) {
  const classes = useStyles();
  const handleEdit = () => {};
  const handleRemove = () => {};
  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Mark</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <Paper></Paper> */}
            {studentList.map((student, id) => (
              <TableRow key={student.id}>
                <TableCell align="left">{student.id}</TableCell>
                <TableCell align="left">{student.name}</TableCell>
                <TableCell align="left">
                  {changeCustomText(student.gender)}
                </TableCell>
                <TableCell align="left">
                  <Box color={changeColorMark(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell align="left">{listCity[student.city]}</TableCell>
                <TableCell align="right">
                  <Button color="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleRemove}
                    className={classes.buttonActions}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
