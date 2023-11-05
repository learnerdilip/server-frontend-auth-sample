import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

export const routes = [
  {
    path: '/', // path for router
    component: <div>Private route</div>, // component to be rendered
    private: false, // is private route?
  },
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
];
