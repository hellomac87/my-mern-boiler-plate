import { put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { push } from "connected-react-router";

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
      data,
    });

    yield put(push("/"));
  } catch (e) {
    yield put({
      type: LOGIN_USER_FAILURE,
    });
  }
}

export function* userSaga() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
}

// state
const initialState = {
  fetching: false,
  userId: null,
  loginSuccess: null,
};

// reducers
export const userReducer = handleActions(
  {
    /** LOGIN */
    [LOGIN_USER_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = true;
      }),
    [LOGIN_USER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
        draft.userId = action.data.userId;
        draft.loginSuccess = action.data.loginSuccess;
      }),
    [LOGIN_USER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
  },
  initialState
);
