import produce from "immer";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";

// constants
export const GET_LOGIN_REQUEST = "AUTH/GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "AUTH/GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILURE = "AUTH/GET_LOGIN_FAILURE";

// action creators
const getLoginRequestAction = createAction(GET_LOGIN_REQUEST);

// sagas
export function* getLoginRequestSaga() {
  console.log("getLoginRequestSaga");
}

export function* authSaga() {
  yield takeLatest(GET_LOGIN_REQUEST, getLoginRequestSaga);
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
    [GET_LOGIN_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = true;
      }),
    [GET_LOGIN_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
    [GET_LOGIN_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.fetching = false;
      }),
  },
  initialState
);
