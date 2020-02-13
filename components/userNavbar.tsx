import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import { logout } from '../util/auth';
import Router from 'next/router';

const Navbar = function(){

    return (
      <div>
        <Wrapper>
          <HomeLink href="/listings">W.</HomeLink>
          <Links>
            <NavLink href="/accountOverview">
              <a>Profile</a>
            </NavLink>
            <NavLink href="/">
              <a
                onClick={() => {
                  logout();
                  Router.push('/');
                }}
              >
                Log Out
              </a>
            </NavLink>
          </Links>
        </Wrapper>
      </div>
    );
}

export default Navbar

const Wrapper = styled.div`
display: flex;
  background: #23565c;
  height: max-content;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  padding: 5px 5vw 5px 5vw;
  justify-content: space-between;
  align-items: center;
`;

const HomeLink = styled.a`
  font-size: 32px;
  text-decoration: none;
  padding: 20px;
  font-weight: bold;
  color: #22222;
  :visited{
    color: #222222;
  }
`

const Links = styled.div`
  a {
    color: white;
    margin-right: 10px;
  }

  a:visited {
    color: white;
  }
`;
const NavLink = styled(Link)`
 
`;