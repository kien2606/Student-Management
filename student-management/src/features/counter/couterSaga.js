import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function* handleIncrementSaga(action) {
  console.log("wait 2s");
  yield delay(2000);
  console.log("waiting done,start to dispatch action");
  yield put(incrementSagaSuccess(action.payload));
}

export default function* couterSaga() {
  console.log("couter saga");
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
