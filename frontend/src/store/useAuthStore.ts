import { create } from 'zustand';

export type AuthUser = {
  id: string;
  email: string;
  nickname: string;
  tagline?: string;
  interests: string[];
};

type AuthState = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  setUserProfile: (profile: Partial<AuthUser>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setUserProfile: (profile) =>
    set((state) => (state.user ? { user: { ...state.user, ...profile } } : state))
}));

// TODO: 필요 시 localStorage 연동으로 새로고침 후에도 로그인 상태를 복원할 수 있도록 확장

