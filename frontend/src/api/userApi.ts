import httpClient from './httpClient';

export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
  contact: string;
  createdAt: string;
};

export type UserCreateRequest = {
  email: string;
  password: string;
  nickname: string;
  contact: string;
};

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  userId: number;
  nickname: string;
};

export const userApi = {
  signup: async (payload: UserCreateRequest) => {
    const { data } = await httpClient.post<UserResponse>('/users', payload);
    return data;
  },
  login: async (payload: UserLoginRequest) => {
    const { data } = await httpClient.post<UserLoginResponse>('/users/login', payload);
    return data;
  },
  getUser: async (id: number) => {
    const { data } = await httpClient.get<UserResponse>(`/users/${id}`);
    return data;
  },
  getUsers: async () => {
    const { data } = await httpClient.get<UserResponse[]>('/users');
    return data;
  }
};

