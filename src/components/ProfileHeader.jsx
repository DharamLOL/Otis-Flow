import React from 'react';
import styles from './ProfileHeader.module.css'; 
import profileImage from '../assets/amanda_silva.jpg';

const ProfileHeader = () => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileIcons}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileText}>
          <span className={styles.profileName}>Amanda Silva</span>
          <span className={styles.profileRole}>Gestora</span>
        </div>
        <img src={profileImage} alt="Amanda Silva" className={styles.profileImage} />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>
  );
};

export default ProfileHeader;