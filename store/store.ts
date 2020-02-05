import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

interface Action {
  type: string;
  payload?: object;
}

const GET_TEST = "GET_TEST";
const GET_LISTINGS = "GET_LISTINGS"

export const getTest = () => ({ type: GET_TEST, payload: "test" });
export const getListings = () => ({ type: GET_LISTINGS, payload: "listings"})

const reducer = (state: any = [], action: Action) => {
  switch (action.type) {
    case GET_TEST:
      return [...state, action.payload];
    case GET_LISTINGS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = (initialState = []) => createStore(reducer, initialState, middleware);

export default initStore;
