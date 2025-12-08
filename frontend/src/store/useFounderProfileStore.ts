import { create } from 'zustand';
import axios from 'axios';
import { founderProfileApi, FounderProfileRequest, FounderProfileResponse } from '../api/founderProfileApi';
import { getAxiosErrorMessage } from '../utils/httpError';

type FounderProfileState = {
  profile: FounderProfileResponse | null;
  profiles: FounderProfileResponse[];
  isLoading: boolean;
  isListLoading: boolean;
  error: string | null;
  fetchProfile: (userId: number) => Promise<void>;
  fetchProfiles: () => Promise<void>;
  createProfile: (userId: number, payload: FounderProfileRequest) => Promise<FounderProfileResponse | null>;
  updateProfile: (userId: number, payload: FounderProfileRequest) => Promise<FounderProfileResponse | null>;
  deleteProfile: (userId: number) => Promise<void>;
  resetError: () => void;
};

export const useFounderProfileStore = create<FounderProfileState>((set) => ({
  profile: null,
  profiles: [],
  isLoading: false,
  isListLoading: false,
  error: null,
  resetError: () => set({ error: null }),
  fetchProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await founderProfileApi.getProfile(userId);
      set({ profile: data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        set({ profile: null });
      } else {
        set({ error: getAxiosErrorMessage(error, '프로필 정보를 불러오지 못했습니다.') });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProfiles: async () => {
    set({ isListLoading: true, error: null });
    try {
      const data = await founderProfileApi.getProfiles();
      set({ profiles: data });
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로필 목록을 불러오지 못했습니다.') });
    } finally {
      set({ isListLoading: false });
    }
  },
  createProfile: async (userId, payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await founderProfileApi.createProfile(userId, payload);
      set({ profile: data });
      return data;
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로필 생성 중 오류가 발생했습니다.') });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  updateProfile: async (userId, payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await founderProfileApi.updateProfile(userId, payload);
      set({ profile: data });
      return data;
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로필 수정 중 오류가 발생했습니다.') });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await founderProfileApi.deleteProfile(userId);
      set({ profile: null });
    } catch (error) {
      set({ error: getAxiosErrorMessage(error, '프로필 삭제 중 오류가 발생했습니다.') });
    } finally {
      set({ isLoading: false });
    }
  }
}));

