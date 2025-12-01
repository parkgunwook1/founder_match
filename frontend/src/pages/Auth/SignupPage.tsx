import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const INTEREST_OPTIONS = ['AI', '헬스케어', '핀테크', '교육', '커머스'];

export const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || !nickname) {
      setError('필수 입력값을 모두 채워 주세요.');
      return;
    }

    // TODO: 추후 axios로 실제 회원가입 API 연동
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <TwoColumn>
          <Field>
            <Label htmlFor="email">이메일*</Label>
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
            <Label htmlFor="nickname">닉네임*</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="예: ProductHunter"
              required
            />
          </Field>
        </TwoColumn>
        <Field>
          <Label htmlFor="password">비밀번호*</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />
        </Field>
        <Field>
          <Label>관심 분야</Label>
          <Interests>
            {INTEREST_OPTIONS.map((interest) => (
              <InterestChip
                key={interest}
                type="button"
                $active={interests.includes(interest)}
                onClick={() => handleInterestToggle(interest)}
              >
                {interest}
              </InterestChip>
            ))}
          </Interests>
        </Field>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">회원가입</SubmitButton>
      </AuthForm>
    </AuthContainer>
  );
};

const AuthContainer = styled.section`
  display: flex;
  justify-content: center;
`;

const AuthForm = styled.form`
  width: min(560px, 100%);
  padding: 48px;
  border-radius: 24px;
  background-color: #ffffff;
  border: 1px solid #e8ecf4;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
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

const Interests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InterestChip = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? '#2d5bff' : '#d5ddeb')};
  background-color: ${({ $active }) => ($active ? '#2d5bff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f2a44')};
  cursor: pointer;
  transition: all 0.2s ease;
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

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.9rem;
`;

