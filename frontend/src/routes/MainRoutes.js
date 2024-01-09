import { lazy } from 'react';

import Loadable from '../components/Loadable/Loadable';
import MainLayout from '../layout/MainLayout';


const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));

const CVPage = Loadable(lazy(() => import('../views/pages/cv-page')));
const CVList = Loadable(lazy(() => import('../views/pages/CVList')));




const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <CVList />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <CVList />
        }
      ]
    },
    {
      path: 'cv-list',
      element: <CVList />
    },
    {
      path: 'cv-page',
      element: <CVPage />
    },
    {
      path: 'cv-page/:id',
      element: <CVPage />
    }
  ]
};

export default MainRoutes;
