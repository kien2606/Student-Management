import { Box, Paper, Typography, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
      display : 'flex',
      flexFlow : 'row nowrap',
      justifyContent : 'space-between',
      alignItems : 'center',
      padding : theme.spacing(2),
      border : `1px solid ${theme.palette.divider}`
  },
}));

function Statistics({ icon, lable, value }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align = 'right'>{value}</Typography>
        <Typography variant="caption">{lable}</Typography>
      </Box>
    </Paper>
  );
}

export default Statistics;
