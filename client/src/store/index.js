import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { userReducer, userSaga } from "store/user/ducks";

export function* rootSaga() {
  yield all([userSaga()]);
}

export const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });
