// src/components/Relatorio.jsx
import { useEffect, useState } from "react";
import { useCache } from "../hooks/useCache";
import { useNavigate } from "react-router-dom";

function Relatorio() {
  const { getEntries } = useCache();
  const navigate = useNavigate();

  const [empresas, setEmpresas] = useState([]);          
  const [empresaSel, setEmpresaSel] = useState("");      
  const [datas, setDatas] = useState([]);                
  const [dataSel, setDataSel] = useState("");            
  const [registros, setRegistros] = useState([]);        

  
  useEffect(() => {
    const tudo = getEntries();               
    setEmpresas(Object.keys(tudo));
  }, [getEntries]);

  
  useEffect(() => {
    if (!empresaSel) {
      setDatas([]);
      setDataSel("");
      setRegistros([]);
      return;
    }

    const porEmpresa = getEntries(empresaSel);
    const listaDatas = Object.keys(porEmpresa).sort(); 
    setDatas(listaDatas);
    setDataSel("");
    setRegistros([]);
  }, [empresaSel, getEntries]);

 
  useEffect(() => {
    if (empresaSel && dataSel) {
      const regs = getEntries(empresaSel, dataSel);
      setRegistros(regs);
    }
  }, [empresaSel, dataSel, getEntries]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "1rem" }}>
      <h2>Relatório de Formulários</h2>

        {/* ---------- Botão Novo formulário ---------- */}
    <button
      onClick={() => navigate("/formulario")}
      style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#0066ff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Novo formulário
    </button>

      {/* ----- Seleção da empresa ----- */}
      <label>
        Empresa:
        <select
          value={empresaSel}
          onChange={(e) => setEmpresaSel(e.target.value)}
        >
          <option value="">— escolha —</option>
          {empresas.map((emp) => (
            <option key={emp} value={emp}>{emp}</option>
          ))}
        </select>
      </label>

      {/* ----- Seleção da data (aparece após escolher empresa) ----- */}
      {datas.length > 0 && (
        <>
          <br />
          <label>
            Data:
            <select
              value={dataSel}
              onChange={(e) => setDataSel(e.target.value)}
            >
              <option value="">— escolha —</option>
              {datas.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </>
      )}

      {/* ----- Tabela de resultados ----- */}
      {registros.length > 0 && (
        <>
          <h3>
            Registros de <strong>{empresaSel}</strong> – <strong>{dataSel}</strong>
          </h3>

          <table
            border="1"
            cellPadding="5"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead style={{ background: "#f0f0f059" }}>
              <tr>
                <th>#</th>
                <th>ID Elevador</th>
                <th>Localização</th>
                <th>Fabricante</th>
                <th>Modelo</th>
                <th>Capacidade</th>
                <th>Última Manutenção</th>
                <th>Viagens/Dia</th>
                <th>Tempo Espera (s)</th>
                <th>Tempo Desloc (s)</th>
                <th>Travamentos/Mês</th>
                <th>Falhas Porta</th>
                <th>Freio Emergência</th>
                <th>Qtd Freio Emerg.</th>
                <th>Ruído Anormal</th>
                <th>Desc. Ruído</th>
                <th>Alarme Func.</th>
                <th>Cabos Tração</th>
                <th>Sist. Freios</th>
                <th>Obs. Freios</th>
                <th>Interfone</th>
                <th>Iluminação</th>
                <th>Ventilação</th>
                <th>Vibração</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{r.elevId ?? "-"}</td>
                  <td>{r.localizacao ?? "-"}</td>
                  <td>{r.fabricante ?? "-"}</td>
                  <td>{r.modelo ?? "-"}</td>
                  <td>{r.capacidade ?? "-"}</td>
                  <td>{r.ultimaManutencao ?? "-"}</td>
                  <td>{r.viagensDia ?? "-"}</td>
                  <td>{r.tempoEspera ?? "-"}</td>
                  <td>{r.tempoDesloc ?? "-"}</td>
                  <td>{r.travamentosMes ?? "-"}</td>
                  <td>{r.falhasPorta ?? "-"}</td>
                  <td>{r.freioEmergencia ?? "-"}</td>
                  <td>{r.qtdFreio ?? "-"}</td>
                  <td>{r.ruidoAnormal ?? "-"}</td>
                  <td>{r.descRuido ?? "-"}</td>
                  <td>{r.alarmeFunc ?? "-"}</td>
                  <td>{r.cabosTracao ?? "-"}</td>
                  <td>{r.sistemaFreios ?? "-"}</td>
                  <td>{r.obsFreios ?? "-"}</td>
                  <td>{r.interfone ?? "-"}</td>
                  <td>{r.iluminacao ?? "-"}</td>
                  <td>{r.ventilacao ?? "-"}</td>
                  <td>{r.vibracao ?? "-"}</td>
                  <td>{new Date(r.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Mensagem caso ainda não haja registros */}
      {empresaSel && dataSel && registros.length === 0 && (
        <p>Nenhum registro encontrado para esta combinação.</p>
      )}
    </div>
  );
}

export default Relatorio;