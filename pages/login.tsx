import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../util/auth';
import { loginUser } from '../store/store';

const Login = (props: any) => {
  const { dispatchLogin } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const onChange = (e: React.FormEvent<HTMLInputElement>, input: string) => {
    switch (input) {
      case 'email':
        setEmail(e.currentTarget.value);
        break;
      case 'password':
        setPassword(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginRes = await axios.post('/api/login', { email, password });
    const { token } = loginRes.data;

    if (token) {
      login(token);

      // const userRes = await axios.get(`/api/users/${token}`);
      // const user = userRes.data;

      // dispatchLogin(user);

      Router.push('/listings');
    } else {
      setError(loginRes.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form name="login" onSubmit={onSubmit}>
        {error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : (
          ''
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => onChange(e, 'email')}
          value={email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => onChange(e, 'password')}
          value={password}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapState = (state: any) => {
  return { logState: () => console.log(state) };
};

const mapDispatch = (dispatch: any) => {
  return {
    dispatchLogin: bindActionCreators(loginUser, dispatch),
  };
};

export default connect(mapState, mapDispatch)(Login);
