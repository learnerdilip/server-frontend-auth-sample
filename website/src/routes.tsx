import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';

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
