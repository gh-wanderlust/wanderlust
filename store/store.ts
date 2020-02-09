import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Dispatch } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import axios from 'axios';

import { Listing, User, Trip } from '../server/db/models/interfaces';

interface Action {
  type: string;
  [key: string]: any;
}

/** INITIAL STATE **/
const initState = {
  listing: {
    ownerPhotos: [],
  },
  user: {},
  interestedUsers: [],
};

/** ACTIONS  **/
const GOT_SINGLE_LISTING = 'GOT_SINGLE_LISTING';
const LOGIN_USER = 'LOGIN_USER';
const CLEAR_INTERESTED_USERS = 'CLEAR_INTERESTED_USERS';
const ADD_INTERESTED_USER = 'ADD_INTERESTED_USER';
const REMOVE_INTERESTED_USER = 'REMOVE_INTERESTED_USER';

/** ACTION CREATORS **/

export const gotSingleListing = (listing: Listing) => ({
  type: GOT_SINGLE_LISTING,
  listing,
});

export const loginUser = (user: User) => ({ type: LOGIN_USER, user });

export const clearInterestedUsers = () => ({
  type: CLEAR_INTERESTED_USERS,
});
export const addInterestedUser = (user: User) => ({
  type: ADD_INTERESTED_USER,
  user,
});
export const removeInterestedUser = (userId: number) => ({
  type: REMOVE_INTERESTED_USER,
  userId,
});

/** THUNKS **/

export const getSingleListing = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(clearInterestedUsers());

    const res = await axios.get(`/api/listings/${id}?include=users`);
    const listing = res.data;

    dispatch(gotSingleListing(listing));

    let users: User[] = [];
    listing.trips.map((trip: Trip) => {
      if (trip.status === 'pending' && trip.users) {
        trip.users.map((user: User) => {
          dispatch(addInterestedUser(user));
        });
      }
    });
  };
};

/** REDUCER **/

const reducer = (state: any = {}, action: Action) => {
  switch (action.type) {
    // case GET_LISTINGS:
    //   return [...state, action.payload];
    case GOT_SINGLE_LISTING:
      return { ...state, listing: action.listing };
    case LOGIN_USER:
      return { ...state, user: action.user };
    case CLEAR_INTERESTED_USERS:
      return {
        ...state,
        interestedUsers: [],
      };
    case ADD_INTERESTED_USER:
      return {
        ...state,
        interestedUsers: [...state.interestedUsers, action.user],
      };
    case REMOVE_INTERESTED_USER:
      return {
        ...state,
        interestedUsers: state.interestedUsers.filter((user: any) => {
          console.log(user.id, action.userId);
          return user.id !== action.userId;
        }),
      };

    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const initStore = (initialState = initState) =>
  createStore(reducer, initialState, middleware);

export default initStore;
