import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchStudent(state, action) {
      state.loading = true;
    },
    fetchStudentSuccess(state, action) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentFailed(state, action) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state,action) {},
  },
});

// action
export const {
  fetchStudent,
  fetchStudentFailed,
  fetchStudentSuccess,
  setFilter,
  setFilterWithDebounce,
} = studentSlice.actions;
//selector

export const studentSelector = (state) => state.student;

//reducer

const studentReducer = studentSlice.reducer;
export default studentReducer;
