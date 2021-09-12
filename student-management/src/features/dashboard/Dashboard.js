import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { fetchDataLoading, selectDashboard } from "./dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

import { PeopleAlt } from "@material-ui/icons";
import ScoreIcon from "@material-ui/icons/Score";
import Statistics from "./components/Statistics";
import StudentRankingList from "./components/StudentRankingList";
import Widget from "./components/Widget";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataLoading());
  }, []);
  const dashboardState = useSelector(selectDashboard);
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
      paddingTop: theme.spacing(1),
    },
    loading: {
      position: "absolute",
      top: theme.spacing(-1),
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* loading */}
      {dashboardState.loading && <LinearProgress className={classes.loading} />}
      {/* statistic section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Statistics
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="male"
            value={dashboardState.statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistics
            icon={<PeopleAlt fontSize="large" color="primary" />}
            lable="female"
            value={dashboardState.statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistics
            icon={<ScoreIcon fontSize="large" color="primary" />}
            lable="MGTE"
            value={dashboardState.statistics.highestMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Statistics
            icon={<ScoreIcon fontSize="large" color="primary" />}
            lable="MLTE"
            value={dashboardState.statistics.lowestMarkCount}
          />
        </Grid>
      </Grid>
      {/* all student ranking list */}
      <Box mt={4}>
        <Typography variant="h4">Mark Student</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item>
              <Widget title="Student with highest mark">
                <StudentRankingList
                  studentList={dashboardState.highestStudentList}
                />
              </Widget>
            </Grid>
            <Grid item>
              <Widget title="Student with lowest mark">
                <StudentRankingList
                  studentList={dashboardState.lowestStudentList}
                />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* list mark student per city */}
      <Box mt={4}>
        <Typography variant="h4">Highest Student By City</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {dashboardState.rankingByCityList.map((scty, id) => {
              return (
                <Grid item key={scty.cityId.code}>
                  <Widget title={scty.cityId.name}>
                    <StudentRankingList studentList={scty.rankingList} />
                  </Widget>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
