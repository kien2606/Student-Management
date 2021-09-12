import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highestMarkCount: 0,
    lowestMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDataLoading(state, action) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
    },
    fetchDataFailed(state, action) {
      state.loading = false;
    },
    setStatistics(state, action) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action) {
      state.rankingByCityList = action.payload;
    },
  },
});
//action
export const {
  fetchDataLoading,
  fetchDataSuccess,
  fetchDataFailed,
  setStatistics,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
} = dashboardSlice.actions;
//selector

export const selectDashboard = (state) => state.dashboard;

//reducer

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
