import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from '../common/Header';
import { GlobalStyle } from '../../styles/GlobalStyle';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <GlobalStyle />
    <AppShell>
      <Header />
      <Content>{children}</Content>
      <Footer>© {new Date().getFullYear()} Startup Matcher. All rights reserved.</Footer>
    </AppShell>
  </>
);

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  width: min(1200px, 90%);
  margin: 0 auto;
  padding: 48px 0 64px;
`;

const Footer = styled.footer`
  padding: 32px 16px;
  text-align: center;
  color: #7d848f;
  font-size: 0.875rem;
  border-top: 1px solid #e3e8ef;
  background-color: #ffffff;
`;



