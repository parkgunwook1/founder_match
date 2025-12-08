import httpClient from './httpClient';

export type FounderProfileRequest = {
  role: string;
  skills: string[];
  interests: string[];
  availability: string;
  bio: string;
};

export type FounderProfileResponse = FounderProfileRequest & {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export const founderProfileApi = {
  createProfile: async (userId: number, payload: FounderProfileRequest) => {
    const { data } = await httpClient.post<FounderProfileResponse>(`/users/${userId}/profile`, payload);
    return data;
  },
  updateProfile: async (userId: number, payload: FounderProfileRequest) => {
    const { data } = await httpClient.put<FounderProfileResponse>(`/users/${userId}/profile`, payload);
    return data;
  },
  getProfile: async (userId: number) => {
    const { data } = await httpClient.get<FounderProfileResponse>(`/users/${userId}/profile`);
    return data;
  },
  deleteProfile: async (userId: number) => {
    await httpClient.delete(`/users/${userId}/profile`);
  },
  getProfiles: async () => {
    const { data } = await httpClient.get<FounderProfileResponse[]>('/profiles');
    return data;
  }
};

