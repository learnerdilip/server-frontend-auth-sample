import { createContext, useState } from 'react';

import { LocalStorageService } from '../services/localstorage';
import { getMe } from '../api/requests';
import { UserContextType, UserType } from './types';

const intialUser = {
  id: '',
  fullName: '',
  email: '',
  role: '',
  avatar: '',
  active: true,
  profilePhotos: [],
};

export const UserContext = createContext<UserContextType>({
  // intialised with empty values
  token: '',
  loginUserWithToken: (token: string) => null,
  user: intialUser,
  getMeDetails: () => null,
  logoutUser: () => null,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<UserType>(intialUser);

  const loginUserWithToken = (token: string) => {
    setToken(token);
    LocalStorageService.setItem('access_token', token);
  };

  const logoutUser = () => {
    setToken('');
    LocalStorageService.removeItem('access_token');
  };

  const getMeDetails = async () => {
    const { data } = (await getMe()) as {
      data: UserType;
      status: number;
    };

    setUser({ ...data });
  };

  return (
    <UserContext.Provider
      value={{ token, user, getMeDetails, logoutUser, loginUserWithToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
