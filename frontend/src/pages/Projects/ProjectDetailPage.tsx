import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useProjectStore } from '../../store/useProjectStore';
import { useAuthStore } from '../../store/useAuthStore';

export const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const numericId = Number(projectId);
  const fetchProject = useProjectStore((state) => state.fetchProject);
  const project = useProjectStore((state) => state.project);
  const isDetailLoading = useProjectStore((state) => state.isDetailLoading);
  const error = useProjectStore((state) => state.error);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const isSubmitting = useProjectStore((state) => state.isSubmitting);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!Number.isNaN(numericId)) {
      fetchProject(numericId);
    }
  }, [fetchProject, numericId]);

  if (Number.isNaN(numericId)) {
    return <Navigate to="/projects" replace />;
  }

  const isOwner = user && project && user.id === project.ownerId;

  const handleDelete = async () => {
    if (!project) {
      return;
    }
    const confirmed = confirm('프로젝트를 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }
    const success = await deleteProject(project.id);
    if (success) {
      alert('프로젝트가 삭제되었습니다.');
      navigate('/projects');
    }
  };

  return (
    <Wrapper>
      {isDetailLoading ? (
        <Placeholder>프로젝트 정보를 불러오는 중입니다...</Placeholder>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : project ? (
        <>
          <HeaderRow>
            <div>
              <StageBadge>{project.stage}</StageBadge>
              <Title>{project.name}</Title>
              <Subtitle>{project.oneLineIntro}</Subtitle>
            </div>
            <ActionGroup>
              {isOwner && (
                <>
                  <SecondaryButton type="button" onClick={() => navigate(`/projects/${project.id}/edit`)}>
                    수정
                  </SecondaryButton>
                  <DangerButton type="button" onClick={handleDelete} disabled={isSubmitting}>
                    삭제
                  </DangerButton>
                </>
              )}
              <SecondaryButton type="button" onClick={() => navigate('/projects')}>
                목록으로
              </SecondaryButton>
            </ActionGroup>
          </HeaderRow>

          <InfoGrid>
            <InfoBlock>
              <Label>도메인</Label>
              <Value>{project.domain}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>근무 형태</Label>
              <Value>{project.workStyle}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>보상 형태</Label>
              <Value>{project.rewardType}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>예상 기간</Label>
              <Value>{project.expectedDuration}</Value>
            </InfoBlock>
          </InfoGrid>

          <DescriptionSection>
            <Label>프로젝트 소개</Label>
            <Description>{project.description}</Description>
            <Timestamp>마지막 업데이트: {new Date(project.updatedAt).toLocaleString('ko-KR')}</Timestamp>
          </DescriptionSection>
        </>
      ) : (
        <Placeholder>프로젝트 정보를 찾을 수 없습니다.</Placeholder>
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
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

const StageBadge = styled.span`
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: #e9f0ff;
  color: #2d5bff;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #6c7280;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SecondaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid #d5ddeb;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
`;

const DangerButton = styled(SecondaryButton)`
  border-color: #fecaca;
  color: #b91c1c;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

const InfoBlock = styled.div`
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e3e8ef;
  background-color: #ffffff;
`;

const Label = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #8a93a8;
  margin-bottom: 6px;
`;

const Value = styled.span`
  font-weight: 600;
  color: #1f2a44;
`;

const DescriptionSection = styled.div`
  padding: 28px;
  border-radius: 24px;
  border: 1px solid #e3e8ef;
  background-color: #ffffff;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.7;
`;

const Timestamp = styled.span`
  display: block;
  margin-top: 16px;
  font-size: 0.85rem;
  color: #9da3b6;
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

