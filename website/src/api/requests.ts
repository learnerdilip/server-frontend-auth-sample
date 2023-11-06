import { API, handleAPIError } from './utils';

export const registerUser = async (formData: FormData) => {
  const { data } = await API.post('/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await API.post('/login', loginData);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const getMe = async () => {
  try {
    const { data } = await API.get('/users/me');
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};
