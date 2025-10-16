import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import SearchBar from '../components/SearchBar';
import CreateEventModal from '../components/CreateEventModal';
import styles from '../css/CalendarioEventos.module.css';

const CalendarioEventos = () => {
  const { eventos } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

 
  const highlightedContractId = location.state?.highlightedContractId;
  const eventosPendentes = eventos.filter(e => e.status === 'pendentes');
  const eventosEmProgresso = eventos.filter(e => e.status === 'emProgresso');
  const eventosEmPausa = eventos.filter(e => e.status === 'emPausa');
  const eventosPrincipais = eventos.slice(0, 1);

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <ProfileHeader />
        <SearchBar />
        <div className={styles.pageSpecificContent}>
          <header className={styles.header}>
            <h1>Calendário de Eventos</h1>
            <button className={styles.createButton} onClick={() => setIsModalOpen(true)}>
              + criar evento
            </button>
          </header>

          <section className={styles.mainEvents}>
            <h2>PRINCIPAIS EVENTOS</h2>
            {eventosPrincipais.map(evento => (
              <div key={evento.id} className={styles.progressBarContainer}>
                <span>{evento.nome}</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${evento.progresso}%` }}></div>
                </div>
                <span>{evento.progresso}%</span>
              </div>
            ))}
          </section>

          <div className={styles.eventColumns}>
            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <h3>PENDENTE</h3>
                <span>{eventosPendentes.length}</span>
              </div>
              {eventosPendentes.map(evento => {
                const isHighlighted = evento.contratoId === highlightedContractId;
                return (
                  <div key={evento.id} className={`${styles.eventCard} ${isHighlighted ? styles.highlighted : ''}`}>
                    <p>{evento.nome}</p>
                    <div className={styles.cardDetails}>
                      <span className={`${styles.priority} ${styles[evento.prioridade.toLowerCase()]}`}>{evento.prioridade}</span>
                      <span>{evento.dias}</span>
                    </div>
                    <div className={styles.cardProgress}>
                      <div className={styles.progressFillSmall} style={{ width: `${evento.progresso}%` }}></div>
                      <span>{evento.progresso}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`${styles.column} ${styles.inProgress}`}>
              <div className={styles.columnHeader}>
                <h3>EM PROGRESSO</h3>
                <span>{eventosEmProgresso.length}</span>
              </div>
              {eventosEmProgresso.map(evento => {
                 const isHighlighted = evento.contratoId === highlightedContractId;
                 return (
                   <div key={evento.id} className={`${styles.eventCard} ${isHighlighted ? styles.highlighted : ''}`}>
                     <p>{evento.nome}</p>
                     <div className={styles.cardDetails}>
                       <span className={`${styles.priority} ${styles[evento.prioridade.toLowerCase()]}`}>{evento.prioridade}</span>
                       <span>{evento.dias}</span>
                     </div>
                     <div className={styles.cardProgress}>
                       <div className={styles.progressFillSmall} style={{ width: `${evento.progresso}%` }}></div>
                       <span>{evento.progresso}%</span>
                     </div>
                   </div>
                 );
              })}
            </div>

            <div className={`${styles.column} ${styles.onHold}`}>
              <div className={styles.columnHeader}>
                <h3>EM PAUSA</h3>
                <span>{eventosEmPausa.length}</span>
              </div>
              {eventosEmPausa.map(evento => {
                 const isHighlighted = evento.contratoId === highlightedContractId;
                 return (
                   <div key={evento.id} className={`${styles.eventCard} ${isHighlighted ? styles.highlighted : ''}`}>
                     <p>{evento.nome}</p>
                     <div className={styles.cardDetails}>
                       <span className={`${styles.priority} ${styles[evento.prioridade.toLowerCase()]}`}>{evento.prioridade}</span>
                       <span>{evento.dias}</span>
                     </div>
                     <div className={styles.cardProgress}>
                       <div className={styles.progressFillSmall} style={{ width: `${evento.progresso}%` }}></div>
                       <span>{evento.progresso}%</span>
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CreateEventModal
          onClose={() => setIsModalOpen(false)}
          onSave={() => alert('Função de criar evento standalone a ser implementada!')}
        />
      )}
    </div>
  );
};

export default CalendarioEventos;