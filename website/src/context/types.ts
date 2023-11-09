export type UserContextType = {
  token: string;
  loginUserWithToken: (token: string) => void;
  user: UserType;
  getMeDetails: () => void;
  logoutUser: () => void;
};

export type UserType = {
  id: string;
  email: string;
  avatar?: string;
  profilePhotos: string[];
  role: string;
  fullName: string;
  active: boolean;
};
