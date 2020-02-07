import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

interface Action {
  type: string;
  payload?: object;
}

// const GET_LISTINGS = "GET_LISTINGS"
const GET_SINGLE_LISTING = 'GET_SINGLE_LISTING';
const LOGIN_USER = 'LOGIN_USER';
const ADD_TRIP_USER = 'ADD_TRIP_USER';
const REMOVE_TRIP_USER = 'REMOVE_TRIP_USER';

// export const getListings = () => ({ type: GET_LISTINGS, payload: "listings" })
export const getSingleListing = () => ({
  type: GET_SINGLE_LISTING,
  payload: 'singleListing',
});
export const loginUser = (user: any) => ({ type: LOGIN_USER, payload: user });
export const addTripUser = (user: any) => ({
  type: ADD_TRIP_USER,
  payload: user,
});
export const removeTripUser = (userId: number) => ({
  type: REMOVE_TRIP_USER,
  payload: userId,
});

const reducer = (state: any = {}, action: Action) => {
  switch (action.type) {
    // case GET_LISTINGS:
    //   return [...state, action.payload];
    case GET_SINGLE_LISTING:
      return { ...state, user: action.payload };
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case ADD_TRIP_USER:
      return { ...state, users: [...state.users, action.payload] };
    case REMOVE_TRIP_USER:
      return {
        ...state,
        users: state.users.filter((user: any) => {
          return user.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = (initialState = { user: {}, users: [] }) =>
  createStore(reducer, initialState, middleware);

export default initStore;
