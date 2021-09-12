import { call, fork, put, take } from "redux-saga/effects";
import { login, logout } from "./authSlice";

import { push } from "connected-react-router";

function* handleLogin(payload) {
  console.log("login", payload);
  localStorage.setItem("access_token", "260620002606");
  yield put(push("/admin/dashboard"));
  //redirect to admin page
}
function* handleLogout() {
  console.log("logout");
  localStorage.removeItem("access_token");
  yield put(push("/login"));

  //redirect to login page
}
function* watchLoginFlow() {
  while (true) {
    console.log("watch login");
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action = yield take(login.type);
      yield fork(handleLogin, action);
    }
    // fork : non blocking , call : blocking
    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
