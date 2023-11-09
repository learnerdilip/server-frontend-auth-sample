import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
});

export const handleAPIError = (error: any) => {
  try {
    return {
      status: error.response?.status,
      error: error.response?.data?.message || 'An error occurred.',
      detail: error.response?.data?.detail || 'No details available',
    };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};
