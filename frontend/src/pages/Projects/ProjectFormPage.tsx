import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProjectDomain, ProjectRequest, ProjectStage, RewardType, WorkStyle } from '../../api/projectApi';
import { useProjectStore } from '../../store/useProjectStore';
import { useAuthStore } from '../../store/useAuthStore';

const stageOptions: ProjectStage[] = ['IDEA', 'MVP', 'REVENUE', 'INVESTED'];
const domainOptions: ProjectDomain[] = ['HEALTHCARE', 'FINTECH', 'EDUCATION', 'ENTERTAINMENT', 'COMMERCE', 'OTHER'];
const workStyleOptions: WorkStyle[] = ['REMOTE', 'ONSITE', 'HYBRID'];
const rewardTypeOptions: RewardType[] = ['EQUITY', 'SALARY', 'NONE', 'REVENUE_SHARE'];

export const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const fetchProject = useProjectStore((state) => state.fetchProject);
  const project = useProjectStore((state) => state.project);
  const createProject = useProjectStore((state) => state.createProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const isSubmitting = useProjectStore((state) => state.isSubmitting);
  const isDetailLoading = useProjectStore((state) => state.isDetailLoading);
  const error = useProjectStore((state) => state.error);

  const numericId = projectId ? Number(projectId) : null;
  const isEditMode = useMemo(() => Boolean(numericId), [numericId]);

  const [name, setName] = useState('');
  const [oneLineIntro, setOneLineIntro] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState<ProjectStage>('IDEA');
  const [domain, setDomain] = useState<ProjectDomain>('OTHER');
  const [workStyle, setWorkStyle] = useState<WorkStyle>('REMOTE');
  const [rewardType, setRewardType] = useState<RewardType>('NONE');
  const [expectedDuration, setExpectedDuration] = useState('');

  useEffect(() => {
    if (isEditMode && numericId) {
      fetchProject(numericId);
    }
  }, [fetchProject, isEditMode, numericId]);

  useEffect(() => {
    if (isEditMode && project) {
      setName(project.name);
      setOneLineIntro(project.oneLineIntro);
      setDescription(project.description);
      setStage(project.stage);
      setDomain(project.domain);
      setWorkStyle(project.workStyle);
      setRewardType(project.rewardType);
      setExpectedDuration(project.expectedDuration);
    }
  }, [isEditMode, project]);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSelectChange =
    <T extends string>(setter: (value: T) => void) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value as T);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !oneLineIntro || !description || !expectedDuration) {
      alert('모든 필수 항목을 입력해 주세요.');
      return;
    }

    const payload: ProjectRequest = {
      ownerId: user.id,
      name,
      oneLineIntro,
      description,
      stage,
      domain,
      workStyle,
      rewardType,
      expectedDuration
    };

    if (isEditMode && numericId) {
      const { ownerId, ...rest } = payload;
      const result = await updateProject(numericId, rest);
      if (result) {
        alert('프로젝트가 업데이트되었습니다.');
        navigate(`/projects/${numericId}`);
      }
    } else {
      const result = await createProject(payload);
      if (result) {
        alert('프로젝트가 생성되었습니다.');
        navigate(`/projects/${result.id}`);
      }
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <div>
          <Title>{isEditMode ? '프로젝트 수정' : '새 프로젝트 등록'}</Title>
          <Subtitle>팀이 어떤 미션을 수행 중인지 구체적으로 작성해 주세요.</Subtitle>
        </div>
      </HeaderRow>

      {isEditMode && isDetailLoading && !project ? (
        <Placeholder>프로젝트 정보를 불러오는 중입니다...</Placeholder>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">프로젝트 이름*</Label>
            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} />
          </Field>
          <Field>
            <Label htmlFor="intro">한 줄 소개*</Label>
            <Input
              id="intro"
              value={oneLineIntro}
              onChange={(event) => setOneLineIntro(event.target.value)}
              required
              maxLength={150}
            />
          </Field>
          <Field>
            <Label htmlFor="description">상세 설명*</Label>
            <Textarea
              id="description"
              rows={8}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              maxLength={2000}
            />
          </Field>
          <Grid>
            <Field>
              <Label htmlFor="stage">단계*</Label>
              <Select id="stage" value={stage} onChange={handleSelectChange<ProjectStage>(setStage)}>
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="domain">도메인*</Label>
              <Select id="domain" value={domain} onChange={handleSelectChange<ProjectDomain>(setDomain)}>
                {domainOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="workStyle">근무 형태*</Label>
              <Select id="workStyle" value={workStyle} onChange={handleSelectChange<WorkStyle>(setWorkStyle)}>
                {workStyleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="rewardType">보상 형태*</Label>
              <Select id="rewardType" value={rewardType} onChange={handleSelectChange<RewardType>(setRewardType)}>
                {rewardTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="duration">예상 기간*</Label>
              <Input
                id="duration"
                value={expectedDuration}
                onChange={(event) => setExpectedDuration(event.target.value)}
                required
                maxLength={50}
              />
            </Field>
          </Grid>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : isEditMode ? '프로젝트 수정' : '프로젝트 생성'}
          </SubmitButton>
        </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 36px;
  border-radius: 24px;
  border: 1px solid #e3e8ef;
  background-color: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.06);
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
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #d5ddeb;
  font-size: 1rem;
  resize: vertical;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
`;

const SubmitButton = styled.button`
  padding: 16px 0;
  border-radius: 14px;
  border: none;
  background-color: #2d5bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.9rem;
`;

