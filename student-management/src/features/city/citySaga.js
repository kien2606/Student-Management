import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCity, fetchCityFailed, fetchCitySuccess } from "./citySlice";

import cityApi from "../../api/cityApi";

function* fetchCityList() {
  try {
    const data = yield call(cityApi.getAll);
    yield put(fetchCitySuccess(data));
  } catch (error) {
    yield put(fetchCityFailed()); 
  }
}

export default function* citySaga() {
  yield takeLatest(fetchCity.type, fetchCityList);
}
