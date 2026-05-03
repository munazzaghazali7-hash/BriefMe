import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  picture: string;
}

interface BriefingState {
  user: User | null;
  isAuthenticated: boolean;
  briefingData: any | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  setBriefingData: (data: any) => void;
  setIsLoading: (status: boolean) => void;
}

export const useBriefingStore = create<BriefingState>((set) => ({
  user: null,
  isAuthenticated: false,
  briefingData: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setBriefingData: (briefingData) => set({ briefingData }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
