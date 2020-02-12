import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = (token: number) => {
  cookie.set('token', token.toString(), { expires: 7 });
};

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/login');
};
