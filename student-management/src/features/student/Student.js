import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import AddEditStudent from "./pages/AddEditStudent";
import { Box } from "@material-ui/core";
import ListStudent from "./pages/ListStudent";
import { fetchCity } from "../city/citySlice";
import { useDispatch } from "react-redux";

function Student() {
    const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchCity());
  }, []);
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.path} component={ListStudent} exact />
        <Route path={`${match.path}/add`} component={AddEditStudent} />
        <Route path={`${match.path}/:studentId`} component={AddEditStudent} />
      </Switch>
    </Box>
  );
}

export default Student;
