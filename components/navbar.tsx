import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import { logout } from '../util/auth';
import Router, {useRouter} from 'next/router';

const Navbar = function(props: any){
const router = useRouter()

    return (
      <div>
        {router.pathname !== '/listings' ? (
          <Wrapper>
            <HomeLink href="/listings">W.</HomeLink>
            {props.token ? (
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
            ) : (
              <Links>
                <NavLink href={'/login'}>Login</NavLink>
                <NavLink href={'/signup'}>Sign Up</NavLink>
              </Links>
            )}
          </Wrapper>
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default Navbar

const Wrapper = styled.div`
display: flex;
  background: #23565c;
  height: max-content;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  padding: 2vh 5vw 2vh 5vw;
  justify-content: space-between;
  align-items: center;
`;

const HomeLink = styled.a`
  font-size: 32px;
  text-decoration: none;
  font-weight: bold;
  color: #22222;
  :visited{
    color: #222222;
  }
`

const Links = styled.div`
  a {
    color: white;
    margin-right: 30px;
  }

  a:visited {
    color: white;
  }
`;
const NavLink = styled(Link)`
 
`;