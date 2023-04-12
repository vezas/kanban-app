import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CssBaseline } from '@mui/material';
import { Dashboard, Home, ProtectedRoute } from 'pages';
import { paths } from 'constants';
import 'lib/styles/main.css';

const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <Home />
  },
  {
    path: `${paths.DASHBOARD}`,
    element: <ProtectedRoute />,
    children: [
      {
        path: `${paths.DASHBOARD}`,
        element: <Dashboard />
      }
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
