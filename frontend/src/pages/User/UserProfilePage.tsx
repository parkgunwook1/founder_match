import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';

export const UserProfilePage = () => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ProfileWrapper>
      <Hero>
        <Avatar>{user.nickname.slice(0, 1).toUpperCase()}</Avatar>
        <Info>
          <Nickname>{user.nickname}</Nickname>
          <Email>{user.email}</Email>
          <Tagline>{user.tagline || '한 줄 소개를 아직 작성하지 않았습니다.'}</Tagline>
        </Info>
        <EditButton
          type="button"
          onClick={() => alert('프로필 수정 기능은 추후 구현 예정입니다.')}
        >
          프로필 수정하기
        </EditButton>
      </Hero>
      <Section>
        <SectionTitle>관심 분야</SectionTitle>
        {user.interests.length > 0 ? (
          <Chips>
            {user.interests.map((interest) => (
              <Chip key={interest}>{interest}</Chip>
            ))}
          </Chips>
        ) : (
          <EmptyState>선택된 관심 분야가 없습니다.</EmptyState>
        )}
      </Section>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Hero = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 32px;
  border-radius: 24px;
  background-color: #ffffff;
  border: 1px solid #e3e8ef;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.06);
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #2d5bff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Info = styled.div`
  flex: 1;
  min-width: 220px;
`;

const Nickname = styled.h2`
  margin: 0;
`;

const Email = styled.p`
  margin: 4px 0;
  color: #6b7285;
`;

const Tagline = styled.p`
  margin: 0;
`;

const EditButton = styled.button`
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid #d5ddeb;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
`;

const Section = styled.div`
  background-color: #ffffff;
  border: 1px solid #e3e8ef;
  border-radius: 20px;
  padding: 28px 32px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled.span`
  padding: 8px 16px;
  border-radius: 999px;
  background-color: #f0f4ff;
  color: #1f2a44;
  font-weight: 500;
`;

const EmptyState = styled.p`
  color: #98a1b3;
  margin: 0;
`;

