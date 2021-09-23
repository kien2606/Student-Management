import {
  Box,
  Button,
  LinearProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import React, { useEffect } from "react";
import {
  fetchStudent,
  setFilter,
  setFilterWithDebounce,
  studentSelector,
} from "../StudentSlice";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "@material-ui/lab";
import StudentFilters from "../components/StudentFilters";
import StudentRankingList from "../components/StudentRankingList";
import { citySelector } from "../../city/citySlice";
import studentApi from "../../../api/studentApi";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

function ListStudent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const studentState = useSelector(studentSelector);
  const pagination = studentState.pagination;
  const filter = studentState.filter;
  const totalPage = pagination?._totalRows / pagination?._limit;
  const currentPage = pagination?._page;
  const loading = studentState.loading;
  const match = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchStudent(filter));
  }, [filter, dispatch]);

  const handlePageChange = (event, page) => {
    dispatch(
      setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  // data city
  const cityState = useSelector(citySelector);
  let listCity = cityState.list.reduce((pre, cur) => {
    const key = cur.code;
    if (!pre[key]) {
      pre[key] = cur.name;
    }
    return { ...pre };
  }, {});
  const handleSearchChange = (value) => {
    dispatch(setFilterWithDebounce(value));
  };
  const handleFilterCity = (value) => {
    dispatch(setFilter(value));
  };
  const handleSortBy = (value) => {
    dispatch(setFilter(value));
  };
  const handleRemoveStudent = async (value) => {
    try {
      await studentApi.remove(value?.id || "");
      const newFilter = { ...filter };
      dispatch(setFilter(newFilter));
    } catch (error) {
      console.log("error", error);
    }
    toast.success("Remove Student Successfully");
  };
  const handleEditStudent = (value) => {
    history.push(`${match.url}/${value.id}`);
  };
  // console.log('filter', filter);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4"> Students Table</Typography>
        {/* btn add student */}
        <Link to={`${match.url}/add`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add New Student
          </Button>
        </Link>
      </Box>
      <Box mb={3}>
        {/* //filters  */}
        <StudentFilters
          filter={filter}
          cityList={cityState.list}
          onSearchChange={handleSearchChange}
          onFilterCity={handleFilterCity}
          onSortBy={handleSortBy}
        />
      </Box>
      {/* student Table */}
      <Box>
        <StudentRankingList
          studentList={studentState.list}
          listCity={listCity}
          onRemove={handleRemoveStudent}
          onEdit={handleEditStudent}
        />
      </Box>
      {/* pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(totalPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default ListStudent;
