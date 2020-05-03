import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from 'store/auth/ducks';

export function* rootSaga() {
  yield all([authSaga()]);
}

export const rootReducer = combineReducers({
  auth: authReducer,
});
