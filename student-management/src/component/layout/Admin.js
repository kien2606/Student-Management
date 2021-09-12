import { Box, makeStyles } from "@material-ui/core";
import {Route, Switch} from 'react-router-dom';

import Dashboard from "../../features/dashboard/Dashboard";
import Header from "../common/Header";
import React from "react";
import Sidebar from "../common/Sidebar";
import Student from "../../features/student/Student";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: `"header header " "sidebar main" `,
    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
    borderBottom: "1px solid lightgray",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: "1px solid lightgray ",
    backgroundColor: "#fff",
  },
  main: {
    gridArea: "main",
    backgroundColor: "#fff",
    padding : theme.spacing(2,3),

  },
}));

export default function Admin() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path = '/admin/dashboard' component = {Dashboard} />
          <Route path = '/admin/students' component = {Student} />
        </Switch>
      </Box>
    </Box>
  );
}
