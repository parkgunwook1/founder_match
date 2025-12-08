import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';
import { useFounderProfileStore } from '../../store/useFounderProfileStore';

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const profile = useFounderProfileStore((state) => state.profile);
  const fetchProfile = useFounderProfileStore((state) => state.fetchProfile);
  const profileLoading = useFounderProfileStore((state) => state.isLoading);
  const profileError = useFounderProfileStore((state) => state.error);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchProfile(user.id);
  }, [fetchProfile, user.id]);

  const interests = user.interests ?? [];
  const formattedCreatedAt = new Date(user.createdAt).toLocaleString('ko-KR');
  const handleEditClick = () => navigate('/user/profile/edit');

  return (
    <ProfileWrapper>
      <Hero>
        <Avatar>{user.nickname.slice(0, 1).toUpperCase()}</Avatar>
        <Info>
          <Nickname>{user.nickname}</Nickname>
          <Email>{user.email}</Email>
          <Tagline>{user.tagline || '한 줄 소개를 아직 작성하지 않았습니다.'}</Tagline>
          <ContactRow>
            <Label>연락 수단</Label>
            <Value>{user.contact}</Value>
          </ContactRow>
          <ContactRow>
            <Label>가입일</Label>
            <Value>{formattedCreatedAt}</Value>
          </ContactRow>
        </Info>
        <EditButton type="button" onClick={handleEditClick}>
          창업자 프로필 {profile ? '수정하기' : '만들기'}
        </EditButton>
      </Hero>
      <Section>
        <SectionTitle>관심 분야</SectionTitle>
        {interests.length > 0 ? (
          <Chips>
            {interests.map((interest) => (
              <Chip key={interest}>{interest}</Chip>
            ))}
          </Chips>
        ) : (
          <EmptyState>선택된 관심 분야가 없습니다.</EmptyState>
        )}
      </Section>
      <Section>
        <SectionTitle>창업자 프로필</SectionTitle>
        {profileLoading ? (
          <EmptyState>프로필 정보를 불러오는 중입니다...</EmptyState>
        ) : profileError ? (
          <ErrorText>{profileError}</ErrorText>
        ) : profile ? (
          <FounderCard>
            <MetaRow>
              <MetaLabel>역할</MetaLabel>
              <MetaValue>{profile.role}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaLabel>핵심 스킬</MetaLabel>
              <ChipRow>
                {profile.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </ChipRow>
            </MetaRow>
            <MetaRow>
              <MetaLabel>관심 분야</MetaLabel>
              <ChipRow>
                {profile.interests.map((interest) => (
                  <Chip key={interest}>{interest}</Chip>
                ))}
              </ChipRow>
            </MetaRow>
            <MetaRow>
              <MetaLabel>가능 시간</MetaLabel>
              <MetaValue>{profile.availability}</MetaValue>
            </MetaRow>
            <Bio>{profile.bio}</Bio>
            <Timestamp>최근 업데이트: {new Date(profile.updatedAt).toLocaleString('ko-KR')}</Timestamp>
          </FounderCard>
        ) : (
          <EmptyState>
            아직 창업자 프로필을 등록하지 않았습니다.
            <InlineButton type="button" onClick={handleEditClick}>
              지금 등록하기
            </InlineButton>
          </EmptyState>
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

const ContactRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-weight: 600;
  color: #4b5566;
`;

const Value = styled.span`
  color: #1f2a44;
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const ErrorText = styled.p`
  color: #dc2626;
  margin: 0;
`;

const InlineButton = styled.button`
  border: none;
  background: none;
  color: #2d5bff;
  font-weight: 600;
  cursor: pointer;
`;

const FounderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MetaLabel = styled.span`
  font-size: 0.9rem;
  color: #8a93a8;
`;

const MetaValue = styled.span`
  font-weight: 600;
  color: #1f2a44;
`;

const ChipRow = styled(Chips)`
  gap: 8px;
`;

const Bio = styled.p`
  margin: 12px 0 0;
  line-height: 1.6;
`;

const Timestamp = styled.span`
  font-size: 0.85rem;
  color: #9da3b6;
`;



