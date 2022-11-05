import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops, cette page n'existe pas !</h1>
      <button onClick={() => navigate('/')}>Retourner à l'accueil</button>
    </div>
  );
}
