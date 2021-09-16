import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { changeColorMark, changeCustomText } from "../../../utils/common";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
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

export default function StudentRankingList({
  studentList,
  listCity,
  onRemove,
  onEdit,
}) {
  const [open, setOpen] = useState(false);
  const [selectedStudent,setSelectedStudent] = useState('');
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const handleEdit = (student) => {
    onEdit(student);
  };
  const showDialogToConfirm = (student) =>{
    setSelectedStudent(student);
    setOpen(true);

  }
  const handleConfirmRemove = () =>{
    onRemove(selectedStudent);
    setOpen(false);
  }
  return (
    <>
      <Paper elevation={3}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="simple table"
            size="small"
          >
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
                    <Box
                      color={changeColorMark(student.mark)}
                      fontWeight="bold"
                    >
                      {student.mark}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{listCity[student.city]}</TableCell>
                  <TableCell align="right">
                    <Button color="primary" onClick={() => handleEdit(student)}>
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => showDialogToConfirm(student)}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove Student By Name
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to remove <b>{selectedStudent.name}</b> student<br />
            This action can not undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
