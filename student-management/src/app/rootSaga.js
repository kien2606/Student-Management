import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import citySaga from "../features/city/citySaga";
import couterSaga from "../features/counter/couterSaga";
import dashboardSaga from "../features/dashboard/dashboardSaga";
import studentSaga from "../features/student/StudentSaga";

export default function* rootSaga() {
  yield all([couterSaga(), authSaga(),dashboardSaga(),studentSaga(),citySaga()]);
}
