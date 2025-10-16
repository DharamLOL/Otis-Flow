import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CreateContractModal from '../components/CreateContractModal';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import SearchBar from '../components/SearchBar';
import styles from '../css/Contratos.module.css';

const Contratos = () => {
  const { contratos, addContrato } = useData();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);
  const [newlyCreatedId, setNewlyCreatedId] = useState(null);

  const handleSaveContract = (novoContratoData) => {
    const newId = addContrato(novoContratoData);
    setNewlyCreatedId(newId);
    setShowSuccessView(true);
  };

  const handleNavigateFromModal = () => {
    console.log("Tentando navegar...");
    if (newlyCreatedId) {
      navigate('/', { state: { highlightedContractId: newlyCreatedId } });
      closeAndResetModal();
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setShowSuccessView(false);
    setNewlyCreatedId(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const contratosVigentes = contratos.filter(c => c.vigencia !== '01/25');
  const contratosExpirados = contratos.filter(c => c.vigencia === '01/25');

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <ProfileHeader />
        <SearchBar />
        <div className={styles.pageSpecificContent}>
          <header className={styles.header}>
            <h1>Contratos</h1>
            <div className={styles.actions}>
              <button className={styles.actionButton}>Ver todos os contratos</button>
              <button className={styles.createButton} onClick={openModal}>
                Criar Contrato
              </button>
            </div>
          </header>

          <div className={styles.grid}>
            <div className={styles.cardVigentes}>
              <h3>Contratos Vigentes</h3>
              {contratosVigentes.map(c => (
                <div key={c.id} className={styles.contractItem}>
                  <div>
                    <p>Serviços em "Shopping {c.shopping}"</p>
                    <span>Vigencia até {c.vigencia}</span>
                  </div>
                  <button className={styles.iconButton} onClick={() => navigate('/', { state: { highlightedContractId: c.id } })}>
                    Ver Contrato
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cardPendentes}>
              <h3>Contratos Pendentes</h3>
              <p className={styles.emptyMessage}>Você não tem nem um contrato pendente!</p>
            </div>

            <div className={styles.cardExpirados}>
              <h3>Contratos Expirados</h3>
              {contratosExpirados.map(c => (
                <div key={c.id} className={styles.contractItem}>
                  <div>
                    <p>Serviços em "{c.shopping}"</p>
                    <span>Vigencia até {c.vigencia}</span>
                  </div>
                  <button className={styles.iconButton}>Renovar Contrato</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CreateContractModal
          onClose={closeAndResetModal}
          onSave={handleSaveContract}
          showSuccess={showSuccessView}
          onNavigate={handleNavigateFromModal}
        />
      )}
    </div>
  );
};

export default Contratos;