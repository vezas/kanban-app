import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from 'lib/components/DashboardLayout';

export const ProtectedRoute: FC = () => {
  const idToken = localStorage.getItem('accessToken');
  const { pathname } = useLocation();

  if (!idToken) {
    return <Navigate to='/' state={{ path: pathname }} />;
  }

  return <DashboardLayout />;
};
