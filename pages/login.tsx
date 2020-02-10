import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import { login } from '../util/auth';

const Login = (props: any) => {
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
    const res = await axios.post('/api/login', { email, password });
    const { data } = res;

    if (data.token) {
      login(data.token);
    } else {
      setError(res.data);
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
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e, type = 'email') => onChange(e, type)}
          value={email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e, type = 'password') => onChange(e, type)}
          value={password}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
