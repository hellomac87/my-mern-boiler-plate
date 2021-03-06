import { put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

// constants
export const LOGIN_USER_REQUEST = "AUTH/LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "AUTH/LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "AUTH/LOGIN_USER_FAILURE";

// action creators
export const loginUser = createAction(LOGIN_USER_REQUEST);

// sagas
export function* loginUserSaga(action) {
  let body = action.payload;
  const { data } = yield axios.post("/api/users/login", body);

  try {
    yield put({
      type: LOGIN_USER_SUCCESS,
      user: data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_USER_FAILURE,
    });
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
}

// state
const initialState = {
  fetching: false,
  user: null,
  auth: null,
};

// reducers
export const authReducer = handleActions(
  {
    /** LOGIN */
    [LOGIN_USER_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = true;
      }),
    [LOGIN_USER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
    [LOGIN_USER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
  },
  initialState
);
