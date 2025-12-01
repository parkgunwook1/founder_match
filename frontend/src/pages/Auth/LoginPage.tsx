import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    const mockUser = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      email,
      nickname: email.split('@')[0],
      interests: ['AI', '핀테크']
    };

    login(mockUser);
    navigate('/user/profile', { replace: true });
  };

  return (
    <AuthContainer>
      <AuthCard onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <Field>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="founder@example.com"
            required
          />
        </Field>
        <Field>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />
        </Field>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">로그인</SubmitButton>
        <HelperText>
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </HelperText>
      </AuthCard>
    </AuthContainer>
  );
};

const AuthContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthCard = styled.form`
  width: min(440px, 100%);
  padding: 48px;
  border-radius: 24px;
  background-color: #ffffff;
  border: 1px solid #e8ecf4;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.07);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
  font-size: 1rem;

  &:focus {
    outline: 2px solid rgba(45, 91, 255, 0.4);
    border-color: transparent;
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 14px 0;
  border-radius: 12px;
  border: none;
  background-color: #2d5bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const HelperText = styled.p`
  text-align: center;
  color: #6b7285;
  margin: 0;

  a {
    color: #2d5bff;
    font-weight: 600;
  }
`;

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.9rem;
`;

