import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CalendarioEventos from './pages/CalendarioEventos.jsx';
import Contratos from './pages/Contratos.jsx';
import './index.css'; 
import { DataProvider } from './context/DataContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CalendarioEventos />, 
  },
  {
    path: '/contratos',
    element: <Contratos />, 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);