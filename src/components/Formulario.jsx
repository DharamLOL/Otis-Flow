// src/components/Formulario.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCache } from "../hooks/useCache";

// ← Importa o módulo CSS (o arquivo será criado depois)
import styles from "./Formulario.module.css";

function Formulario() {
  const navigate = useNavigate();
  const { addEntry } = useCache();

  /* ---------- estado dos campos ---------- */
  const [empresa, setEmpresa] = useState("");
  const [data, setData] = useState(dayjs().format("YYYY-MM-DD"));

  // ----- informações do elevador -----
  const [elevId, setElevId] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [ultimaManutencao, setUltimaManutencao] = useState("");

  // ----- métricas de desempenho -----
  const [viagensDia, setViagensDia] = useState("");
  const [tempoEspera, setTempoEspera] = useState("");
  const [tempoDesloc, setTempoDesloc] = useState("");

  // ----- métricas de segurança -----
  const [travamentosMes, setTravamentosMes] = useState("");
  const [falhasPorta, setFalhasPorta] = useState("");
  const [freioEmergencia, setFreioEmergencia] = useState("não"); // sim/não
  const [qtdFreio, setQtdFreio] = useState("");
  const [ruidoAnormal, setRuidoAnormal] = useState("não"); // sim/não
  const [descRuido, setDescRuido] = useState("");
  const [alarmeFunc, setAlarmeFunc] = useState("não"); // sim/não

  // ----- inspeção técnica -----
  const [cabosTracao, setCabosTracao] = useState("bom");
  const [sistemaFreios, setSistemaFreios] = useState("ok");
  const [obsFreios, setObsFreios] = useState("");
  const [interfone, setInterfone] = useState("");
  const [iluminacao, setIluminacao] = useState("");
  const [ventilacao, setVentilacao] = useState("");
  const [vibracao, setVibracao] = useState("baixa");

  /* ---------- envio ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!empresa.trim() || !elevId.trim()) {
      alert("Preencha ao menos o nome da empresa e o ID do elevador.");
      return;
    }

    const payload = {
      // informações básicas
      elevId,
      localizacao,
      fabricante,
      modelo,
      capacidade,
      ultimaManutencao,

      // métricas de desempenho
      viagensDia,
      tempoEspera,
      tempoDesloc,

      // métricas de segurança
      travamentosMes,
      falhasPorta,
      freioEmergencia,
      qtdFreio,
      ruidoAnormal,
      descRuido,
      alarmeFunc,

      // inspeção técnica
      cabosTracao,
      sistemaFreios,
      obsFreios,
      interfone,
      iluminacao,
      ventilacao,
      vibracao,

      // meta‑dados de controle
      timestamp: new Date().toISOString(),
    };

    addEntry(empresa.trim(), data, payload);
    navigate("/relatorio");
  };

  /* ---------- JSX ---------- */
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Formulário de Inspeção de Elevador</h2>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* ==== Identificação ==== */}
        <div className={styles.section}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Identificação</legend>

            <label className={styles.label}>
              Nome da empresa:
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Data:
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                className={styles.input}
              />
            </label>
          </fieldset>
        </div>

        {/* ==== Informações do Elevador ==== */}
        <div className={styles.section}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Informações do Elevador</legend>

            <label className={styles.label}>
              ID do Elevador:
              <input
                type="text"
                value={elevId}
                onChange={(e) => setElevId(e.target.value)}
                required
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Localização (Prédio/Andar):
              <input
                type="text"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Fabricante:
              <input
                type="text"
                value={fabricante}
                onChange={(e) => setFabricante(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Modelo:
              <input
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Capacidade (kg/pessoas):
              <input
                type="number"
                min="0"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Data da última manutenção:
              <input
                type="date"
                value={ultimaManutencao}
                onChange={(e) => setUltimaManutencao(e.target.value)}
                className={styles.input}
              />
            </label>
          </fieldset>
        </div>

        {/* ==== Métricas de Desempenho ==== */}
        <div className={styles.section}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Métricas de Desempenho</legend>

            <label className={styles.label}>
              Número de viagens por dia:
              <input
                type="number"
                min="0"
                value={viagensDia}
                onChange={(e) => setViagensDia(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Tempo médio de espera no andar (segundos):
              <input
                type="number"
                min="0"
                value={tempoEspera}
                onChange={(e) => setTempoEspera(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Tempo médio de deslocamento (andar a andar):
              <input
                type="number"
                min="0"
                value={tempoDesloc}
                onChange={(e) => setTempoDesloc(e.target.value)}
                className={styles.input}
              />
            </label>
          </fieldset>
        </div>

        {/* ==== Métricas de Segurança ==== */}
        <div className={styles.section}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Métricas de Segurança</legend>

            <label className={styles.label}>
              Número de travamentos do mês:
              <input
                type="number"
                min="0"
                value={travamentosMes}
                onChange={(e) => setTravamentosMes(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Falhas de abertura/fechamento de porta:
              <input
                type="number"
                min="0"
                value={falhasPorta}
                onChange={(e) => setFalhasPorta(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <span className={styles.label}>Ativação de freio de emergência:</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="freioEmergencia"
                  value="sim"
                  checked={freioEmergencia === "sim"}
                  onChange={() => setFreioEmergencia("sim")}
                />
                Sim
              </label>
              <label className={styles.radioLabel} style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="freioEmergencia"
                  value="não"
                  checked={freioEmergencia === "não"}
                  onChange={() => setFreioEmergencia("não")}
                />
                Não
              </label>
            </div>

            {freioEmergencia === "sim" && (
              <>
                <label className={styles.label}>
                  Quantas vezes?
                  <input
                    type="number"
                    min="0"
                    value={qtdFreio}
                    onChange={(e) => setQtdFreio(e.target.value)}
                    className={styles.input}
                  />
                </label>
                <br />
              </>
            )}

            <span className={styles.label}>Relatos de ruído anormal:</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="ruidoAnormal"
                  value="sim"
                  checked={ruidoAnormal === "sim"}
                  onChange={() => setRuidoAnormal("sim")}
                />
                Sim
              </label>
              <label className={styles.radioLabel} style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="ruidoAnormal"
                  value="não"
                  checked={ruidoAnormal === "não"}
                  onChange={() => setRuidoAnormal("não")}
                />
                Não
              </label>
            </div>

            {ruidoAnormal === "sim" && (
              <>
                <label className={styles.label}>
                  Descrição:
                  <textarea
                    rows={2}
                    value={descRuido}
                    onChange={(e) => setDescRuido(e.target.value)}
                    className={styles.textarea}
                  />
                </label>
                <br />
              </>
            )}

            <span className={styles.label}>Botão de alarme funcionando?</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="alarmeFunc"
                  value="sim"
                  checked={alarmeFunc === "sim"}
                  onChange={() => setAlarmeFunc("sim")}
                />
                Sim
              </label>
              <label className={styles.radioLabel} style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="alarmeFunc"
                  value="não"
                  checked={alarmeFunc === "não"}
                  onChange={() => setAlarmeFunc("não")}
                />
                Não
              </label>
            </div>
          </fieldset>
        </div>

        {/* ==== Inspeção Técnica ==== */}
        <div className={styles.section}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Inspeção Técnica</legend>

            <label className={styles.label}>
              Estado dos cabos de tração:
              <select
                value={cabosTracao}
                onChange={(e) => setCabosTracao(e.target.value)}
                className={styles.select}
              >
                <option value="bom">Bom</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim</option>
              </select>
            </label>

            <br />

            <label className={styles.label}>
              Sistema de freios:
              <select
                value={sistemaFreios}
                onChange={(e) => setSistemaFreios(e.target.value)}
                className={styles.select}
              >
                <option value="ok">OK</option>
                <option value="não ok">Não OK</option>
              </select>
            </label>

            {sistemaFreios !== "ok" && (
              <>
                <label className={styles.label}>
                  Observações:
                  <textarea
                    rows={2}
                    value={obsFreios}
                    onChange={(e) => setObsFreios(e.target.value)}
                    className={styles.textarea}
                  />
                </label>
                <br />
              </>
            )}

            {/* ---- Campo movido para cá ---- */}
            <label className={styles.label}>
              Sistema de comunicação (interfone):
              <input
                type="text"
                value={interfone}
                onChange={(e) => setInterfone(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Iluminação interna:
              <input
                type="text"
                value={iluminacao}
                onChange={(e) => setIluminacao(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Sistema de ventilação:
              <input
                type="text"
                value={ventilacao}
                onChange={(e) => setVentilacao(e.target.value)}
                className={styles.input}
              />
            </label>

            <br />

            <label className={styles.label}>
              Nível de vibração:
              <select
                value={vibracao}
                onChange={(e) => setVibracao(e.target.value)}
                className={styles.select}
              >
                <option value="baixa">Baixa</option>
                <option value="médio">Médio</option>
                <option value="alto">Alto</option>
              </select>
            </label>
          </fieldset>
        </div>

        {/* ==== Botão de envio ==== */}
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
          >
            Salvar e ir ao Relatório
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;