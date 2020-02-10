import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import { login } from '../util/auth';

interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
}

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    let updateFn;
    switch (type) {
      case 'username':
        updateFn = setUsername;
        break;
      case 'fname':
        updateFn = setFName;
        break;
      case 'lname':
        updateFn = setLName;
        break;
      case 'email':
        updateFn = setEmail;
        break;
      case 'password':
        updateFn = setPassword;
        break;
      case 'imageurl':
        updateFn = setImageUrl;
        break;
      default:
        return;
    }

    updateFn(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('here');

    const userInfo: UserInfo = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    if (imageUrl !== '') {
      userInfo.imageUrl = imageUrl;
    }

    console.log(userInfo);
    const res = await axios.post('/api/users', userInfo);
    const newUser = res.data;
    console.log(res);

    login(newUser.id);
    Router.replace('/listings');
  };

  return (
    <div>
      <h2>Signup</h2>
      <form name="signup" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Display Name"
          onChange={(e) => onChange(e, 'username')}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => onChange(e, 'password')}
          required
        />
        <input
          type="text"
          name="first-name"
          placeholder="First name"
          onChange={(e) => onChange(e, 'fname')}
          required
        />
        <input
          type="text"
          name="last-name"
          placeholder="Last name"
          onChange={(e) => onChange(e, 'lname')}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => onChange(e, 'email')}
          required
        />
        <input
          type="url"
          name="image-url"
          placeholder="Profile picture (Optional)"
          onChange={(e) => onChange(e, 'imageurl')}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
