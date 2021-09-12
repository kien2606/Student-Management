import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    fetchCity(state, action) {
      state.loading = true;
    },
    fetchCitySuccess(state, action) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityFailed(state, action) {
      state.loading = false;
    },
  },
});

//action
export const { fetchCity, fetchCityFailed, fetchCitySuccess } =
  citySlice.actions;
//selector
export const citySelector = (state) => state.city;
//reducer

const cityReducer = citySlice.reducer;
export default cityReducer;
