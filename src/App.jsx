// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Formulario from "./components/Formulario";
import Relatorio from "./components/Relatorio";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão → redireciona para o relatório */}
        <Route path="/" element={<Navigate replace to="/relatorio" />} />

        {/* Rotas explícitas */}
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/relatorio" element={<Relatorio />} />

        {/* Caso queira um fallback 404 */}
        <Route path="*" element={<p>Página não encontrada.</p>} />
      </Routes>
    </Router>
  );
}