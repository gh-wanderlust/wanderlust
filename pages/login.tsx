import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Link from 'next/link';
import styled from 'styled-components';

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

      Router.push('/accountOverview');
    } else {
      setError(loginRes.data);
    }
  };

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <h2>Login</h2>
          <FormWrapper>
            <form name="login" onSubmit={onSubmit}>
              {error ? (
                <div>
                  <p>{error}</p>
                </div>
              ) : (
                ''
              )}
              <EmailWrapper>
                <label htmlFor="email">Email</label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => onChange(e, 'email')}
                    value={email}
                    required
                  />
                </InputWrapper>
              </EmailWrapper>
              <PasswordWrapper>
                <label htmlFor="password">Password</label>
                <InputWrapper>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => onChange(e, 'password')}
                    value={password}
                    required
                  />
                </InputWrapper>
              </PasswordWrapper>
              <SubmitWrapper>
                <Button type="submit">Login</Button>
              </SubmitWrapper>
            </form>
          </FormWrapper>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};
const mapState = (state: any) => {
  return { logState: () => console.log(state) };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    dispatchLogin: bindActionCreators(loginUser, dispatch),
  };
};

export default connect(mapState, mapDispatch)(Login);

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
  height: 20vw;
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
`

const Button = styled.button`
  background: white;
  color: #23565c;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: #FFFFFF;
  border-radius: 3px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
