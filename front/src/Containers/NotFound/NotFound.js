import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import Logo from '../../assets/images/icon-colored.png';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt="" />
      <h1 className={styles.title}>Oops, cette page n'existe pas !</h1>
      <button onClick={() => navigate('/')}>Retourner à l'accueil</button>
    </div>
  );
}
