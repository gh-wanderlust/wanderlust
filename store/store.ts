import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

interface Action {
  type: string;
  payload?: object;
}

// const GET_LISTINGS = "GET_LISTINGS"
const GET_SINGLE_LISTING = "GET_SINGLE_LISTING"
const LOGIN_USER = "LOGIN_USER"
const TRIP_USERS = "TRIP_USERS"

// export const getListings = () => ({ type: GET_LISTINGS, payload: "listings" })
export const getSingleListing = () => ({ type: GET_SINGLE_LISTING, payload: "singleListing" })
export const loginUser = (user: any) => ({ type: LOGIN_USER, payload: user })
export const tripUsers = (users: []) => ({ type: TRIP_USERS, payload: users })

const reducer = (state: any = {}, action: Action) => {
  switch (action.type) {
    // case GET_LISTINGS:
    //   return [...state, action.payload];
    case GET_SINGLE_LISTING:
      return {...state, user: action.payload};
    case LOGIN_USER:
      return {...state, user: action.payload};
    case TRIP_USERS:
      return {...state, users: action.payload}
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = (initialState = {user: {}, users: []}) => createStore(reducer, initialState, middleware);

export default initStore;
