import React from 'react';
import styled from 'styled-components';

const Navbar = function(){

    return (
      <div>
      <Wrapper>
        <HomeLink href='/listings'>W.</HomeLink>
        </Wrapper>
      </div>
    );
}

export default Navbar

const Wrapper = styled.div`
  background: #23565c;
  width: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  height: 10vw;
`

const HomeLink = styled.a`
  font-size: 60px;
  font-family: 'Lucida Console', sans-serif;
  text-decoration: none;
  padding: 20px;
  color: #ffffff;
`