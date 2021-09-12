import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
import {
  fetchStudent,
  fetchStudentFailed,
  fetchStudentSuccess,
  setFilter,
  setFilterWithDebounce,
} from "./StudentSlice";

import studentApi from "../../api/studentApi";

function* fetchStudentList(action) {
  try {
    const response = yield call(studentApi.getAll, action.payload);
    yield put(fetchStudentSuccess(response));
  } catch (error) {
    yield put(fetchStudentFailed());
  }
}

function* handleSearchDebounce(action) {
  yield put(setFilter(action.payload));
}

export default function* studentSaga() {
  // watch fetch student action
  yield takeLatest(fetchStudent.type, fetchStudentList);
  yield debounce(500,setFilterWithDebounce.type, handleSearchDebounce);
}
