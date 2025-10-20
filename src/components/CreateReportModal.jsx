// src/components/CreateReportModal.jsx
import React from 'react';
import ReportForm from './ReportForm'; 
import styles from './CreateReportModal.module.css'; 

const CreateReportModal = ({ onSave, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <ReportForm onSave={onSave} onClose={onClose} />
      </div>
    </div>
  );
};

export default CreateReportModal;