import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';
import { useFounderProfileStore } from '../../store/useFounderProfileStore';
import { FounderProfileRequest } from '../../api/founderProfileApi';

const toCommaSeparated = (values: string[]) => values.join(', ');

const parseCommaSeparated = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const FounderProfileFormPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const fetchProfile = useFounderProfileStore((state) => state.fetchProfile);
  const profile = useFounderProfileStore((state) => state.profile);
  const isLoading = useFounderProfileStore((state) => state.isLoading);
  const error = useFounderProfileStore((state) => state.error);
  const createProfile = useFounderProfileStore((state) => state.createProfile);
  const updateProfile = useFounderProfileStore((state) => state.updateProfile);
  const deleteProfile = useFounderProfileStore((state) => state.deleteProfile);

  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [fetchProfile, user]);

  useEffect(() => {
    if (profile) {
      setRole(profile.role);
      setSkills(toCommaSeparated(profile.skills));
      setInterests(toCommaSeparated(profile.interests));
      setAvailability(profile.availability);
      setBio(profile.bio);
    } else {
      setRole('');
      setSkills('');
      setInterests('');
      setAvailability('');
      setBio('');
    }
  }, [profile]);

  const isEditMode = useMemo(() => Boolean(profile), [profile]);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role || !skills || !interests || !availability || !bio) {
      alert('모든 필수 항목을 입력해 주세요.');
      return;
    }

    const payload: FounderProfileRequest = {
      role,
      skills: parseCommaSeparated(skills),
      interests: parseCommaSeparated(interests),
      availability,
      bio
    };

    const result = isEditMode
      ? await updateProfile(user.id, payload)
      : await createProfile(user.id, payload);

    if (result) {
      alert(isEditMode ? '프로필이 업데이트되었습니다.' : '프로필이 생성되었습니다.');
      navigate('/user/profile');
    }
  };

  const handleDelete = async () => {
    if (!profile) {
      return;
    }

    const confirmed = confirm('프로필을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }

    await deleteProfile(user.id);
    alert('프로필이 삭제되었습니다.');
    navigate('/user/profile');
  };

  return (
    <Wrapper>
      <HeaderRow>
        <div>
          <Title>{isEditMode ? '프로필 수정' : '창업자 프로필 등록'}</Title>
          <Subtitle>역할과 스킬을 명확히 소개하면 좋은 팀을 더 빨리 만날 수 있어요.</Subtitle>
        </div>
        {isEditMode && (
          <DangerButton type="button" onClick={handleDelete} disabled={isLoading}>
            프로필 삭제
          </DangerButton>
        )}
      </HeaderRow>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="role">역할*</Label>
          <Input
            id="role"
            placeholder="예: Product Manager, Full-stack Developer"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="skills">핵심 스킬*</Label>
          <Helper>쉼표(,)로 구분해 여러 개를 입력하세요. 예: Agile, Figma</Helper>
          <Input
            id="skills"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="interests">관심 분야*</Label>
          <Helper>예: AI, Fintech, 헬스케어</Helper>
          <Input
            id="interests"
            value={interests}
            onChange={(event) => setInterests(event.target.value)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="availability">가능 시간*</Label>
          <Input
            id="availability"
            placeholder="예: 주 10시간, Full-time"
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="bio">소개*</Label>
          <Helper>최대 500자</Helper>
          <Textarea
            id="bio"
            rows={6}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            maxLength={500}
            required
          />
        </Field>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '저장 중...' : isEditMode ? '프로필 업데이트' : '프로필 생성'}
        </SubmitButton>
      </Form>
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
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
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

const Helper = styled.span`
  font-size: 0.85rem;
  color: #8a93a8;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d5ddeb;
  font-size: 1rem;

  &:focus {
    outline: 2px solid rgba(45, 91, 255, 0.3);
    border-color: transparent;
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #d5ddeb;
  font-size: 1rem;
  resize: vertical;
  min-height: 160px;

  &:focus {
    outline: 2px solid rgba(45, 91, 255, 0.3);
    border-color: transparent;
  }
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

const DangerButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid #fecaca;
  background-color: #fee2e2;
  color: #b91c1c;
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

