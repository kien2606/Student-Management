import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";

import React from "react";
import { Search } from "@material-ui/icons";

function StudentFilters({ filter, onSearchChange, cityList, onFilterCity ,onSortBy}) {
  const handleSearchChange = (e) => {
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleFilterByCity = (e) => {
    const newFilter = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };
    onFilterCity(newFilter);
  };
  const handleSortByMark = (e) => {
    const value = e.target.value;
    const [_sort,_order] = value.split('.');
    console.log(_sort,_order);
    const newFilter = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order : _order || undefined,
    };
    onSortBy(newFilter);
  };
  return (
    <Box>
      <Grid spacing={3} container>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <InputLabel id="Search By City">Search By City</InputLabel>
            <Select
              labelId="Search By City"
              value={filter.city || ""}
              onChange={handleFilterByCity}
              label="Search By City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((x) => {
                return (
                  <MenuItem key={x.code} value={x.code}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <InputLabel id="Sort By">Sort By</InputLabel>
            <Select
              labelId="Sort By"
              value={filter._sort? `${filter._sort}.${filter._order }` : ""}
              onChange={handleSortByMark}
              label="Sort By"
            >
              <MenuItem value="">
                <em>Nothing</em>
              </MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilters;
