import { create } from 'zustand';
import { projectApi, ProjectQueryParams, ProjectRequest, ProjectResponse, ProjectUpdateRequest } from '../api/projectApi';
import { getAxiosErrorMessage } from '../utils/httpError';

type ProjectState = {
  projects: ProjectResponse[];
  project: ProjectResponse | null;
  isListLoading: boolean;
  isDetailLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  fetchProjects: (params?: ProjectQueryParams) => Promise<void>;
  fetchProject: (projectId: number) => Promise<void>;
  createProject: (payload: ProjectRequest) => Promise<ProjectResponse | null>;
  updateProject: (projectId: number, payload: ProjectUpdateRequest) => Promise<ProjectResponse | null>;
  deleteProject: (projectId: number) => Promise<boolean>;
  resetError: () => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  project: null,
  isListLoading: false,
  isDetailLoading: false,
  isSubmitting: false,
  error: null,
  resetError: () => set({ error: null }),
  fetchProjects: async (params) => {
    set({ isListLoading: true, error: null });
    try {
      const data = await projectApi.getProjects(params);
      set({ projects: data });
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로젝트 목록을 불러오지 못했습니다.') });
    } finally {
      set({ isListLoading: false });
    }
  },
  fetchProject: async (projectId) => {
    set({ isDetailLoading: true, error: null });
    try {
      const data = await projectApi.getProject(projectId);
      set({ project: data });
    } catch (error) {
      set({ project: null });
      set({ error: getAxiosErrorMessage(error, '프로젝트 정보를 불러오지 못했습니다.') });
    } finally {
      set({ isDetailLoading: false });
    }
  },
  createProject: async (payload) => {
    set({ isSubmitting: true, error: null });
    try {
      const data = await projectApi.createProject(payload);
      return data;
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로젝트 생성에 실패했습니다.') });
      return null;
    } finally {
      set({ isSubmitting: false });
    }
  },
  updateProject: async (projectId, payload) => {
    set({ isSubmitting: true, error: null });
    try {
      const data = await projectApi.updateProject(projectId, payload);
      set({ project: data });
      return data;
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로젝트 수정에 실패했습니다.') });
      return null;
    } finally {
      set({ isSubmitting: false });
    }
  },
  deleteProject: async (projectId) => {
    set({ isSubmitting: true, error: null });
    try {
      await projectApi.deleteProject(projectId);
      return true;
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로젝트 삭제에 실패했습니다.') });
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  }
}));

