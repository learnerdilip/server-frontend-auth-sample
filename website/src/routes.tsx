import { lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/Profile'));
const Register = lazy(() => import('./pages/Register'));
const RegisterSuccess = lazy(() => import('./pages/RegisterSuccess'));

export const routes = [
  {
    path: '/profile',
    component: <Profile />,
    private: true,
  },
  {
    path: '/login',
    component: <Login />,
    private: false,
  },
  {
    path: '/register',
    component: <Register />,
    private: false,
  },
  {
    path: '/register-success',
    component: <RegisterSuccess />,
    private: false,
  },
  {
    path: '/not-found',
    component: <NotFound />,
    private: false,
  },
];
