import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";

import authReducer from "../features/auth/authSlice";
import cityReducer from "../features/city/citySlice";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import { history } from "../utils/history";
import rootSaga from "./rootSaga";
import studentReducer from "../features/student/StudentSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student : studentReducer,
  city : cityReducer,
});
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
