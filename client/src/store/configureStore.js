import { rootReducer, rootSaga } from 'store';
// import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const configureStore = (preLoadedState) => {
  const store = createStore(
    rootReducer, // root reducer with router state
    preLoadedState,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(sagaMiddleware)
      : composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
