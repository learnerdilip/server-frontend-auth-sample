import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export const routes = [
  {
    path: "/", // path for router
    component: <div>Private route</div>, // component to be rendered
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];
