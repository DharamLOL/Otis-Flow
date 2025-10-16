import React, { useState } from 'react';
import styles from './CreateContractModal.module.css'; 

const CreateContractModal = ({
  onSave,
  onClose,
  showSuccess, 
  onNavigate,  
}) => {
  const [shopping, setShopping] = useState('');
  const [vigencia, setVigencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shopping || !vigencia) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave({ shopping, vigencia });
  };

  
  if (showSuccess) {
    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2>Sucesso!</h2>
          <p>O contrato e o evento correspondente foram criados.</p>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Fechar
            </button>
            <button type="button" className={styles.saveButton} onClick={onNavigate}>
              Ver no Calendário
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Criar Novo Contrato</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="shopping">Nome do Shopping</label>
            <input
              type="text"
              id="shopping"
              value={shopping}
              onChange={(e) => setShopping(e.target.value)}
              placeholder="Ex: Iguatemi"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="vigencia">Vigência (MM/AA)</label>
            <input
              type="text"
              id="vigencia"
              value={vigencia}
              onChange={(e) => setVigencia(e.target.value)}
              placeholder="Ex: 12/26"
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar Contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContractModal;