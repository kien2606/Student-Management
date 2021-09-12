import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  fetchDataFailed,
  fetchDataLoading,
  fetchDataSuccess,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from "./dashboardSlice";

import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";

function* fetchStatistics() {
  const responseList = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statistics = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highestMarkCount, lowestMarkCount] =
    statistics;
  yield put(
    setStatistics({ maleCount, femaleCount, highestMarkCount, lowestMarkCount })
  );
}
function* fetchHighestStudentList() {
  const {data} = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });
  yield put(setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data } = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });

  yield put(setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  // fetch city list
  const { data: cityList } = yield call(cityApi.getAll);
  // fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "desc",
      city: x.code,
    })
  );
  const responseList = yield all(callList);
  console.log(responseList);
  const rankingByCityList = responseList.map((x, idx) => ({
    cityId: cityList[idx],
    rankingList: x.data,
  }));
  console.log(rankingByCityList);
  //dispatch
  yield put(setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(fetchDataSuccess());
  } catch (error) {
    console.log("Failed to fetch data", error);
    yield put(fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDataLoading.type, fetchDashboardData);
}
