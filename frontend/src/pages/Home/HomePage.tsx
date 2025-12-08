import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const founderNeeds = [
  {
    title: 'AI 연구자와 함께할 PM',
    description: '생성형 AI 기반 협업툴을 만들고 싶어요. 사용자 경험을 책임질 PM을 찾고 있습니다.'
  },
  {
    title: '헬스케어 SaaS 공동창업자',
    description: '병원 재무관리 SaaS를 준비 중입니다. 의료 도메인을 잘 아는 파트너가 필요해요.'
  },
  {
    title: '핀테크 프로덕트 디자이너',
    description: 'MZ세대 자산관리 앱을 기획 중입니다. 디자인과 브랜딩을 리드할 분을 찾습니다.'
  }
];

export const HomePage = () => {
  const navigate = useNavigate();

  const handleFindFounders = () => {
    navigate('/profiles');
  };

  const handleCreateProfile = () => {
    navigate('/signup');
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroBadge>창업자 매칭 플랫폼</HeroBadge>
        <HeroTitle>아이디어는 있는데 함께할 공동 창업자를 찾지 못한 사람들을 연결해요.</HeroTitle>
        <HeroSubtitle>
          실력 있는 예비 창업자들이 모여 서로를 발견하고, 팀을 이루고, 빠르게 시장에 나갈 수 있도록 돕습니다.
        </HeroSubtitle>
        <HeroActions>
          <PrimaryButton type="button" onClick={handleFindFounders}>
            창업자 찾기
          </PrimaryButton>
          <SecondaryButton type="button" onClick={handleCreateProfile}>
            내 프로필 만들기
          </SecondaryButton>
        </HeroActions>
      </HeroSection>

      <Section>
        <SectionTitle>창업자 매칭이 필요한 사람들</SectionTitle>
        <Cards>
          {founderNeeds.map((card) => (
            <Card key={card.title}>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </Card>
          ))}
        </Cards>
      </Section>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #eff4ff 0%, #ffffff 100%);
  border-radius: 24px;
  padding: 56px 64px;
  box-shadow: 0 40px 80px rgba(45, 91, 255, 0.08);
`;

const HeroBadge = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d5bff;
  background-color: rgba(45, 91, 255, 0.12);
  padding: 6px 14px;
  border-radius: 999px;
`;

const HeroTitle = styled.h1`
  margin: 20px 0 12px;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  color: #0d1c3d;
`;

const HeroSubtitle = styled.p`
  margin-bottom: 32px;
  font-size: 1.1rem;
  color: #4b5566;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 14px 28px;
  border-radius: 999px;
  border: none;
  background-color: #2d5bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 28px;
  border-radius: 999px;
  border: 1px solid #c9d1f0;
  background-color: transparent;
  color: #1f2a44;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  margin-bottom: 24px;
  font-size: 1.6rem;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 18px;
  background-color: #ffffff;
  border: 1px solid #edf0f7;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.1rem;
`;

const CardDescription = styled.p`
  margin: 0;
  color: #5f6a83;
  font-size: 0.95rem;
`;



