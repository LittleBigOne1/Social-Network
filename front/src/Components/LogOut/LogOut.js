import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from '../../assets/images/logout.svg';
import styles from './LogOutLogout.module.css';

export default function LogOut() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get('/auth/logout');
    navigate('/login');
  };

  return (
    <>
      <img
        role="button"
        onClick={handleLogout}
        className={styles.logout}
        src={Logout}
        alt="Se déconnecter"
      />
    </>
  );
}
