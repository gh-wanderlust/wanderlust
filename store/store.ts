import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

interface Action {
  type: string;
  payload?: object;
}

const GET_TEST = "GET_TEST";

export const getTest = () => ({ type: GET_TEST, payload: "test" });

const reducer = (state: any = [], action: Action) => {
  switch (action.type) {
    case GET_TEST:
      return [...state, action.payload];
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = () => createStore(reducer, middleware);

export default initStore;
