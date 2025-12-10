import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProjectStore } from '../../store/useProjectStore';
import { ProjectDomain, ProjectStage, RewardType, WorkStyle } from '../../api/projectApi';
import { useAuthStore } from '../../store/useAuthStore';

const stageOptions: ProjectStage[] = ['IDEA', 'MVP', 'REVENUE', 'INVESTED'];
const domainOptions: ProjectDomain[] = ['HEALTHCARE', 'FINTECH', 'EDUCATION', 'ENTERTAINMENT', 'COMMERCE', 'OTHER'];
const workStyleOptions: WorkStyle[] = ['REMOTE', 'ONSITE', 'HYBRID'];
const rewardTypeOptions: RewardType[] = ['EQUITY', 'SALARY', 'NONE', 'REVENUE_SHARE'];

export const ProjectListPage = () => {
  const navigate = useNavigate();
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const projects = useProjectStore((state) => state.projects);
  const isListLoading = useProjectStore((state) => state.isListLoading);
  const error = useProjectStore((state) => state.error);
  const user = useAuthStore((state) => state.user);

  const [stage, setStage] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [workStyle, setWorkStyle] = useState<string>('');
  const [rewardType, setRewardType] = useState<string>('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSelectChange =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchProjects({
      stage: stage || undefined,
      domain: domain || undefined,
      workStyle: workStyle || undefined,
      rewardType: rewardType || undefined,
      keyword: keyword || undefined
    });
  };

  const handleReset = () => {
    setStage('');
    setDomain('');
    setWorkStyle('');
    setRewardType('');
    setKeyword('');
    fetchProjects();
  };

  return (
    <Wrapper>
      <HeaderRow>
        <div>
          <Title>프로젝트 탐색</Title>
          <Subtitle>현재 진행 중인 팀을 확인하고, 마음에 드는 프로젝트에 합류해보세요.</Subtitle>
        </div>
        {user && (
          <PrimaryButton type="button" onClick={() => navigate('/projects/new')}>
            프로젝트 등록
          </PrimaryButton>
        )}
      </HeaderRow>

      <FilterForm onSubmit={handleSubmit}>
        <SelectWrapper>
          <label htmlFor="stage">프로젝트 단계</label>
          <Select id="stage" value={stage} onChange={handleSelectChange(setStage)}>
            <option value="">전체</option>
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </SelectWrapper>
        <SelectWrapper>
          <label htmlFor="domain">도메인</label>
          <Select id="domain" value={domain} onChange={handleSelectChange(setDomain)}>
            <option value="">전체</option>
            {domainOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </SelectWrapper>
        <SelectWrapper>
          <label htmlFor="workStyle">근무 형태</label>
          <Select id="workStyle" value={workStyle} onChange={handleSelectChange(setWorkStyle)}>
            <option value="">전체</option>
            {workStyleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </SelectWrapper>
        <SelectWrapper>
          <label htmlFor="rewardType">보상 형태</label>
          <Select id="rewardType" value={rewardType} onChange={handleSelectChange(setRewardType)}>
            <option value="">전체</option>
            {rewardTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </SelectWrapper>
        <InputWrapper>
          <label htmlFor="keyword">키워드</label>
          <Input
            id="keyword"
            placeholder="한 줄 소개 또는 설명을 검색해보세요."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </InputWrapper>
        <Actions>
          <PrimaryButton type="submit">검색</PrimaryButton>
          <SecondaryButton type="button" onClick={handleReset}>
            초기화
          </SecondaryButton>
        </Actions>
      </FilterForm>

      {isListLoading ? (
        <Placeholder>프로젝트 목록을 불러오는 중입니다...</Placeholder>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : projects.length === 0 ? (
        <Placeholder>조건에 맞는 프로젝트가 없습니다.</Placeholder>
      ) : (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <Badge>{project.stage}</Badge>
              <CardTitle>{project.name}</CardTitle>
              <CardIntro>{project.oneLineIntro}</CardIntro>
              <Meta>
                <MetaLabel>도메인</MetaLabel>
                <MetaValue>{project.domain}</MetaValue>
              </Meta>
              <Meta>
                <MetaLabel>근무 형태</MetaLabel>
                <MetaValue>{project.workStyle}</MetaValue>
              </Meta>
              <Meta>
                <MetaLabel>보상</MetaLabel>
                <MetaValue>{project.rewardType}</MetaValue>
              </Meta>
              <Meta>
                <MetaLabel>예상 기간</MetaLabel>
                <MetaValue>{project.expectedDuration}</MetaValue>
              </Meta>
              <DetailLink to={`/projects/${project.id}`}>자세히 보기</DetailLink>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #6c7280;
`;

const FilterForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #e3e8ef;
  background-color: #ffffff;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
`;

const InputWrapper = styled(SelectWrapper)``;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  background-color: #2d5bff;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
  background-color: transparent;
  color: #1f2a44;
  cursor: pointer;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.article`
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #e3e8ef;
  background-color: #ffffff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: #f0f4ff;
  color: #2d5bff;
  font-weight: 600;
`;

const CardTitle = styled.h3`
  margin: 6px 0 0;
`;

const CardIntro = styled.p`
  margin: 0;
  color: #6c7280;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #4b5566;
`;

const MetaLabel = styled.span`
  color: #8a93a8;
`;

const MetaValue = styled.span`
  font-weight: 600;
`;

const DetailLink = styled(Link)`
  margin-top: auto;
  color: #2d5bff;
  font-weight: 600;
`;

