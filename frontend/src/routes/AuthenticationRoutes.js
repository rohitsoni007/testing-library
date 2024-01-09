import { lazy } from 'react';
import Loadable from '../components/Loadable/Loadable';
import MinimalLayout from '../layout/MinimalLayout';


const Login = Loadable(lazy(() => import('../views/pages/Login')));
const Register = Loadable(lazy(() => import('../views/pages/Register')));


const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]
};

export default AuthenticationRoutes;
