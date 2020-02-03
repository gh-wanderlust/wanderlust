import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

interface Action {
  type: string;
  payload?: object;
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = () => createStore(reducer, middleware);

export default initStore;
