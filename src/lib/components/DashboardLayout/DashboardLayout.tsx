import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const DashboardLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
