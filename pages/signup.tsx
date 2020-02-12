import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import styled from 'styled-components'

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
      <Wrapper>
        <InnerWrapper>
          <h2>Sign Up!</h2>
          <FormWrapper>
            <form name="signup" onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  type="text"
                  name="username"
                  placeholder="Display Name"
                  onChange={(e: any) => onChange(e, 'username')}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e: any) => onChange(e, 'password')}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  name="first-name"
                  placeholder="First name"
                  onChange={(e: any) => onChange(e, 'fname')}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  name="last-name"
                  placeholder="Last name"
                  onChange={(e: any) => onChange(e, 'lname')}
                  required
                />
              </InputWrapper>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e: any) => onChange(e, 'email')}
                    required
                  />
                </InputWrapper>
              <InputWrapper>
                <Input
                  type="url"
                  name="image-url"
                  placeholder="Profile picture (Optional)"
                  onChange={(e: any) => onChange(e, 'imageurl')}
                />
              </InputWrapper>
              <SubmitWrapper>
                <Button type="submit">Start travelling!</Button>
              </SubmitWrapper>
            </form>
          </FormWrapper>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default Signup;

const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 20vw;
  height: 30vw;
  align-items: center;
  justify-content: center;
  background-color: #23565c;
  box-shadow: 2px 2px 7px #888888;
  border-radius: 2%;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const EmailWrapper = styled.div`
  padding: 10px;
`;

const PasswordWrapper = styled.div`
  padding: 10px;
`;

const SubmitWrapper = styled.div`
  padding: 10px;
`;

const InputWrapper = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  width: 10vw;
  height: 3vh;
`;

const Button = styled.button`
  background: white;
  color: #23565c;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;