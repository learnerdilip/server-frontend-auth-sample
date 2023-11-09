import { LocalStorageService } from '../services/localstorage';
import { API, handleAPIError } from './utils';

export const registerUser = async (formData: FormData) => {
  try {
    const { data, status } = await API.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { data, status };
  } catch (error) {
    return handleAPIError(error);
  }
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const { data, status } = await API.post('/login', loginData);
    return { data, status };
  } catch (error) {
    return handleAPIError(error);
  }
};

export const getMe = async () => {
  try {
    const { data, status } = await API.get('/users/me', {
      headers: {
        Authorization: `Bearer ${LocalStorageService.getItem('access_token')}`,
      },
    });
    return { data, status };
  } catch (error) {
    return handleAPIError(error);
  }
};
