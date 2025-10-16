import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CalendarioEventos from './pages/CalendarioEventos.jsx';
import Contratos from './pages/Contratos.jsx';
import './index.css'; 
import { DataProvider } from './context/DataContext.jsx';
import ProdutosServicos from './pages/ProdutoServicos.jsx';
import ReportsDashboard from './pages/ReportsDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/eventos',
    element: <CalendarioEventos />, 
  },

  {
    path: '/contratos',
    element: <Contratos />, 
  },

 {
    path: '/',
    element: <ProdutosServicos />, 
 },

 {
    path: '/dashboards',
    element: <ReportsDashboard />, 
 }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);