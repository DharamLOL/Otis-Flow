import React, { useState } from 'react';
import styles from './CreatEventModal.module.css';

const CreateEventModal = ({ onSave, onClose }) => {
  const [nome, setNome] = useState('');
  const [prioridade, setPrioridade] = useState('BAIXA'); 
  const [status, setStatus] = useState('pendentes'); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!nome) {
      alert('Por favor, preencha o nome do evento.');
      return;
    }

    const novoEvento = {
      id: Date.now(), 
      nome,
      prioridade,
      dias: '...',
      progresso: status === 'pendentes' ? 0 : 1, 
    };

    onSave(novoEvento, status); 
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Criar Novo Evento</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome do Evento</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Instalação de câmeras..."
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className={styles.select}
            >
              <option value="BAIXA">Baixa</option>
              <option value="MÉDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              <option value="pendentes">Pendente</option>
              <option value="emProgresso">Em Progresso</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;