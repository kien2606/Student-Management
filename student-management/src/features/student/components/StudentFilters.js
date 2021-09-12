import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

import React from "react";
import { Search } from "@material-ui/icons";

function StudentFilters({ filter, onSearchChange }) {
  const handleSearchChange = (e) => {
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  return (
    <Box>
      <Grid spacing={3} container>
        <Grid item>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              endAdornment={<Search />}
              labelWidth={60}
              label="Search By Name"
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilters;
