import { useState } from "react";
import dayjs from "dayjs";
import styles from "./ReportForm.module.css"; 

const ReportForm = ({ onSave, onClose }) => {
  
  const [empresa, setEmpresa] = useState("");
  const [data, setData] = useState(dayjs().format("YYYY-MM-DD"));
  const [elevId, setElevId] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [ultimaManutencao, setUltimaManutencao] = useState("");
  const [viagensDia, setViagensDia] = useState("");
  const [tempoEspera, setTempoEspera] = useState("");
  const [tempoDesloc, setTempoDesloc] = useState("");
  const [travamentosMes, setTravamentosMes] = useState("");
  const [falhasPorta, setFalhasPorta] = useState("");
  const [freioEmergencia, setFreioEmergencia] = useState("não");
  const [qtdFreio, setQtdFreio] = useState("");
  const [ruidoAnormal, setRuidoAnormal] = useState("não");
  const [descRuido, setDescRuido] = useState("");
  const [alarmeFunc, setAlarmeFunc] = useState("não");
  const [cabosTracao, setCabosTracao] = useState("bom");
  const [sistemaFreios, setSistemaFreios] = useState("ok");
  const [obsFreios, setObsFreios] = useState("");
  const [interfone, setInterfone] = useState("");
  const [iluminacao, setIluminacao] = useState("");
  const [ventilacao, setVentilacao] = useState("");
  const [vibracao, setVibracao] = useState("baixa");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empresa.trim() || !elevId.trim()) {
      alert("Preencha ao menos o nome da empresa e o ID do elevador.");
      return;
    }

   
    const fullReportData = {
      empresa,
      data,
      elevId,
      localizacao,
      fabricante,
      modelo,
      capacidade,
      ultimaManutencao,
      viagensDia,
      tempoEspera,
      tempoDesloc,
      travamentosMes,
      falhasPorta,
      freioEmergencia,
      qtdFreio,
      ruidoAnormal,
      descRuido,
      alarmeFunc,
      cabosTracao,
      sistemaFreios,
      obsFreios,
      interfone,
      iluminacao,
      ventilacao,
      vibracao,
      timestamp: new Date().toISOString(),
    };

  
    onSave(fullReportData);
  };

  return (

    <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Formulário de Inspeção de Elevador</h2>
        
        
        <div className={styles.section}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Identificação</legend>
                <label className={styles.label} htmlFor="empresa">Nome da empresa:</label>
                <input id="empresa" type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required className={styles.input} />
                <label className={styles.label} htmlFor="data">Data:</label>
                <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required className={styles.input} />
            </fieldset>
        </div>

        {/* ==== Informações do Elevador ==== */}
        <div className={styles.section}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Informações do Elevador</legend>
                <label className={styles.label} htmlFor="elevId">ID do Elevador:</label>
                <input id="elevId" type="text" value={elevId} onChange={(e) => setElevId(e.target.value)} required className={styles.input} />
                <label className={styles.label} htmlFor="localizacao">Localização (Prédio/Andar):</label>
                <input id="localizacao" type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="fabricante">Fabricante:</label>
                <input id="fabricante" type="text" value={fabricante} onChange={(e) => setFabricante(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="modelo">Modelo:</label>
                <input id="modelo" type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="capacidade">Capacidade (kg/pessoas):</label>
                <input id="capacidade" type="number" min="0" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="ultimaManutencao">Data da última manutenção:</label>
                <input id="ultimaManutencao" type="date" value={ultimaManutencao} onChange={(e) => setUltimaManutencao(e.target.value)} className={styles.input} />
            </fieldset>
        </div>

        {/* ==== Métricas de Desempenho ==== */}
        <div className={styles.section}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Métricas de Desempenho</legend>
                <label className={styles.label} htmlFor="viagensDia">Número de viagens por dia:</label>
                <input id="viagensDia" type="number" min="0" value={viagensDia} onChange={(e) => setViagensDia(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="tempoEspera">Tempo médio de espera no andar (segundos):</label>
                <input id="tempoEspera" type="number" min="0" value={tempoEspera} onChange={(e) => setTempoEspera(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="tempoDesloc">Tempo médio de deslocamento (andar a andar):</label>
                <input id="tempoDesloc" type="number" min="0" value={tempoDesloc} onChange={(e) => setTempoDesloc(e.target.value)} className={styles.input} />
            </fieldset>
        </div>

        {/* ==== Métricas de Segurança ==== */}
        <div className={styles.section}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Métricas de Segurança</legend>
                <label className={styles.label} htmlFor="travamentosMes">Número de travamentos do mês:</label>
                <input id="travamentosMes" type="number" min="0" value={travamentosMes} onChange={(e) => setTravamentosMes(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="falhasPorta">Falhas de abertura/fechamento de porta:</label>
                <input id="falhasPorta" type="number" min="0" value={falhasPorta} onChange={(e) => setFalhasPorta(e.target.value)} className={styles.input} />
                <span className={styles.label}>Ativação de freio de emergência:</span>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="freioEmergencia" value="sim" checked={freioEmergencia === "sim"} onChange={() => setFreioEmergencia("sim")} /> Sim</label>
                    <label className={styles.radioLabel}><input type="radio" name="freioEmergencia" value="não" checked={freioEmergencia === "não"} onChange={() => setFreioEmergencia("não")} /> Não</label>
                </div>
                {freioEmergencia === "sim" && (<label className={styles.label} htmlFor="qtdFreio">Quantas vezes?<input id="qtdFreio" type="number" min="0" value={qtdFreio} onChange={(e) => setQtdFreio(e.target.value)} className={styles.input} /></label>)}
                <span className={styles.label}>Relatos de ruído anormal:</span>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="ruidoAnormal" value="sim" checked={ruidoAnormal === "sim"} onChange={() => setRuidoAnormal("sim")} /> Sim</label>
                    <label className={styles.radioLabel}><input type="radio" name="ruidoAnormal" value="não" checked={ruidoAnormal === "não"} onChange={() => setRuidoAnormal("não")} /> Não</label>
                </div>
                {ruidoAnormal === "sim" && (<label className={styles.label} htmlFor="descRuido">Descrição:<textarea id="descRuido" rows={2} value={descRuido} onChange={(e) => setDescRuido(e.target.value)} className={styles.textarea} /></label>)}
                <span className={styles.label}>Botão de alarme funcionando?</span>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="alarmeFunc" value="sim" checked={alarmeFunc === "sim"} onChange={() => setAlarmeFunc("sim")} /> Sim</label>
                    <label className={styles.radioLabel}><input type="radio" name="alarmeFunc" value="não" checked={alarmeFunc === "não"} onChange={() => setAlarmeFunc("não")} /> Não</label>
                </div>
            </fieldset>
        </div>

        {/* ==== Inspeção Técnica ==== */}
        <div className={styles.section}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Inspeção Técnica</legend>
                <label className={styles.label} htmlFor="cabosTracao">Estado dos cabos de tração:</label>
                <select id="cabosTracao" value={cabosTracao} onChange={(e) => setCabosTracao(e.target.value)} className={styles.select}><option value="bom">Bom</option><option value="regular">Regular</option><option value="ruim">Ruim</option></select>
                <label className={styles.label} htmlFor="sistemaFreios">Sistema de freios:</label>
                <select id="sistemaFreios" value={sistemaFreios} onChange={(e) => setSistemaFreios(e.target.value)} className={styles.select}><option value="ok">OK</option><option value="não ok">Não OK</option></select>
                {sistemaFreios !== "ok" && (<label className={styles.label} htmlFor="obsFreios">Observações:<textarea id="obsFreios" rows={2} value={obsFreios} onChange={(e) => setObsFreios(e.target.value)} className={styles.textarea} /></label>)}
                <label className={styles.label} htmlFor="interfone">Sistema de comunicação (interfone):</label>
                <input id="interfone" type="text" value={interfone} onChange={(e) => setInterfone(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="iluminacao">Iluminação interna:</label>
                <input id="iluminacao" type="text" value={iluminacao} onChange={(e) => setIluminacao(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="ventilacao">Sistema de ventilação:</label>
                <input id="ventilacao" type="text" value={ventilacao} onChange={(e) => setVentilacao(e.target.value)} className={styles.input} />
                <label className={styles.label} htmlFor="vibracao">Nível de vibração:</label>
                <select id="vibracao" value={vibracao} onChange={(e) => setVibracao(e.target.value)} className={styles.select}><option value="baixa">Baixa</option><option value="médio">Médio</option><option value="alto">Alto</option></select>
            </fieldset>
        </div>

        
        <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
                Salvar Relatório
            </button>
        </div>
    </form>
  );
};

export default ReportForm;