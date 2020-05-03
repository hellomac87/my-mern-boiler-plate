import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { authReducer, authSaga } from "store/auth/ducks";

export function* rootSaga() {
  yield all([authSaga()]);
}

export const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });
