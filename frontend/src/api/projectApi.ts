import httpClient from './httpClient';

export type ProjectStage = 'IDEA' | 'MVP' | 'REVENUE' | 'INVESTED';
export type ProjectDomain = 'HEALTHCARE' | 'FINTECH' | 'EDUCATION' | 'ENTERTAINMENT' | 'COMMERCE' | 'OTHER';
export type WorkStyle = 'REMOTE' | 'ONSITE' | 'HYBRID';
export type RewardType = 'EQUITY' | 'SALARY' | 'NONE' | 'REVENUE_SHARE';

export type ProjectRequest = {
  ownerId: number;
  name: string;
  oneLineIntro: string;
  description: string;
  stage: ProjectStage;
  domain: ProjectDomain;
  workStyle: WorkStyle;
  rewardType: RewardType;
  expectedDuration: string;
};

export type ProjectUpdateRequest = Partial<Omit<ProjectRequest, 'ownerId'>>;

export type ProjectResponse = {
  id: number;
  ownerId: number;
  name: string;
  oneLineIntro: string;
  description: string;
  stage: ProjectStage;
  domain: ProjectDomain;
  workStyle: WorkStyle;
  rewardType: RewardType;
  expectedDuration: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectQueryParams = Partial<{
  stage: ProjectStage;
  domain: ProjectDomain;
  workStyle: WorkStyle;
  rewardType: RewardType;
  keyword: string;
}>;

export const projectApi = {
  createProject: async (payload: ProjectRequest) => {
    const { data } = await httpClient.post<ProjectResponse>('/projects', payload);
    return data;
  },
  updateProject: async (projectId: number, payload: ProjectUpdateRequest) => {
    const { data } = await httpClient.patch<ProjectResponse>(`/projects/${projectId}`, payload);
    return data;
  },
  getProject: async (projectId: number) => {
    const { data } = await httpClient.get<ProjectResponse>(`/projects/${projectId}`);
    return data;
  },
  getProjects: async (params?: ProjectQueryParams) => {
    const { data } = await httpClient.get<ProjectResponse[]>('/projects', { params });
    return data;
  },
  deleteProject: async (projectId: number) => {
    await httpClient.delete(`/projects/${projectId}`);
  }
};

