import Router from 'next/router';
import nextCookie from 'next-cookies';
import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import initStore, { loginUser, logoutUser } from '../store/store';
import { apiUrl } from './index';

export const login = async (token: number) => {
  cookie.set('token', token.toString(), { expires: 7 });
};

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now().toString());
};
