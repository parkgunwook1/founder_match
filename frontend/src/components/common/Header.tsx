import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';

export const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <NavContent>
        <Logo to="/">Startup Matcher</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profiles">창업자 찾기</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/user/profile">마이페이지</NavLink>
              <LogoutButton type="button" onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <PrimaryLink to="/signup">회원가입</PrimaryLink>
            </>
          )}
        </Nav>
      </NavContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e8ef;
`;

const NavContent = styled.div`
  width: min(1200px, 90%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const navLinkStyles = `
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 500;
  transition: background-color 0.2s ease;
`;

const NavLink = styled(Link)`
  ${navLinkStyles}

  &:hover {
    background-color: #f0f4ff;
  }
`;

const PrimaryLink = styled(Link)`
  ${navLinkStyles}
  background-color: #2d5bff;
  color: #ffffff;
`;

const LogoutButton = styled.button`
  ${navLinkStyles}
  border: none;
  background-color: #f4f5f7;
  cursor: pointer;

  &:hover {
    background-color: #e3e8ef;
  }
`;



