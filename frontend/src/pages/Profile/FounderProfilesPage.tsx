import { useEffect } from 'react';
import { useFounderProfileStore } from '../../store/useFounderProfileStore';
import styled from 'styled-components';

export const FounderProfilesPage = () => {
  const profiles = useFounderProfileStore((state) => state.profiles);
  const isListLoading = useFounderProfileStore((state) => state.isListLoading);
  const error = useFounderProfileStore((state) => state.error);
  const fetchProfiles = useFounderProfileStore((state) => state.fetchProfiles);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <Wrapper>
      <PageHeader>
        <div>
          <Title>창업자 프로필 탐색</Title>
          <Subtitle>관심 분야와 역할이 맞는 창업자를 빠르게 찾아보세요.</Subtitle>
        </div>
      </PageHeader>
      {isListLoading ? (
        <Placeholder>프로필을 불러오는 중입니다...</Placeholder>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : profiles.length === 0 ? (
        <Placeholder>등록된 창업자 프로필이 아직 없습니다.</Placeholder>
      ) : (
        <ProfileGrid>
          {profiles.map((profile) => (
            <ProfileCard key={profile.id}>
              <Badge>{profile.role}</Badge>
              <CardTitle>{profile.bio}</CardTitle>
              <Meta>
                <MetaLabel>관심 분야</MetaLabel>
                <Chips>
                  {profile.interests.map((interest) => (
                    <Chip key={interest}>{interest}</Chip>
                  ))}
                </Chips>
              </Meta>
              <Meta>
                <MetaLabel>핵심 스킬</MetaLabel>
                <Chips>
                  {profile.skills.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </Chips>
              </Meta>
              <Availability>활동 가능 시간: {profile.availability}</Availability>
              <Timestamp>업데이트: {new Date(profile.updatedAt).toLocaleString('ko-KR')}</Timestamp>
            </ProfileCard>
          ))}
        </ProfileGrid>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #6c7280;
`;

const Placeholder = styled.div`
  padding: 48px;
  border-radius: 20px;
  border: 1px dashed #d5ddeb;
  text-align: center;
  color: #6c7280;
`;

const ErrorMessage = styled(Placeholder)`
  color: #dc2626;
  border-color: #fecaca;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const ProfileCard = styled.article`
  padding: 24px;
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e3e8ef;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: #f0f4ff;
  color: #2d5bff;
  font-weight: 600;
`;

const CardTitle = styled.p`
  margin: 4px 0 0;
  font-size: 1rem;
  color: #1f2a44;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MetaLabel = styled.span`
  font-size: 0.9rem;
  color: #8a93a8;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background-color: #f5f6fa;
  font-size: 0.85rem;
  color: #1f2a44;
`;

const Availability = styled.p`
  margin: 12px 0 0;
  font-weight: 600;
`;

const Timestamp = styled.span`
  font-size: 0.85rem;
  color: #9da3b6;
`;

