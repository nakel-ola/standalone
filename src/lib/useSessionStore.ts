import { create } from "zustand";

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
};

type Session = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, firstName?: string, lastName?: string) => void;
  logout: () => void;
};

export const useSessionStore = create<Session>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, firstName?: string, lastName?: string) => {
    set({
      isAuthenticated: true,
      user: {
        email,
        firstName,
        lastName,
      },
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
