import { createContext, useState } from 'react';
import { LocalStorageService } from '../services/localstorage';

export const UserContext = createContext<UserContextType>({
  token: '',
  loginUserWithToken: (token: string) => null,
  user: {},
  setUser: (user: object) => null,
  logoutUser: () => null,
});

export type UserContextType = {
  token: string;
  loginUserWithToken: (token: string) => void;
  user: {};
  setUser: (user: object) => void;
  logoutUser: () => void;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<any>({});

  const loginUserWithToken = (token: string) => {
    setToken(token);
    LocalStorageService.setItem('access_token', token);
  };

  const logoutUser = () => {
    setToken('');
    LocalStorageService.removeItem('access_token');
  };

  return (
    <UserContext.Provider
      value={{ token, user, setUser, logoutUser, loginUserWithToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
