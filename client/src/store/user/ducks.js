import { put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { push } from "connected-react-router";

// constants
export const LOGIN_USER_REQUEST = "AUTH/LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "AUTH/LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "AUTH/LOGIN_USER_FAILURE";

export const REGISTER_USER_REQUEST = "AUTH/REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "AUTH/REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "AUTH/REGISTER_USER_FAILURE";

export const AUTH_USER_REQUEST = "AUTH/AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "AUTH/AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH/AUTH_USER_FAILURE";

// action creators
export const loginUser = createAction(LOGIN_USER_REQUEST);
export const registerUser = createAction(REGISTER_USER_REQUEST);
export const authUser = createAction(AUTH_USER_REQUEST);

// sagas
function* loginUserSaga(action) {
  let body = action.payload;

  try {
    const { data } = yield axios.post("/api/users/login", body);
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

function* registerUserSaga(action) {
  let body = action.payload;

  try {
    const { data } = yield axios.post("/api/users/register", body);
    yield put({
      type: REGISTER_USER_SUCCESS,
      data,
    });

    yield put(push("/login"));
  } catch (e) {
    yield put({
      type: REGISTER_USER_FAILURE,
    });
  }
}

function* authUserSaga(_) {
  try {
    const { data } = yield axios.get("/api/users/auth");

    yield put({
      type: AUTH_USER_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: AUTH_USER_FAILURE,
    });
  }
}

export function* userSaga() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
  yield takeLatest(AUTH_USER_REQUEST, authUserSaga);
}

// state
const initialState = {
  fetching: false,
  userId: null,
  loginSuccess: null,
  register: null,
  userData: null,
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
    /** REGISTER */
    [REGISTER_USER_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = true;
      }),
    [REGISTER_USER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
        draft.register = action.data;
      }),
    [REGISTER_USER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
    /** AUTH */
    [AUTH_USER_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = true;
      }),
    [AUTH_USER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
        draft.userData = action.data;
      }),
    [AUTH_USER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
  },
  initialState
);
