import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from '../../assets/images/logout.svg';

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
        src={Logout}
        alt="Se déconnecter"
        tabIndex="0"
        title="déconnexion"
      />
    </>
  );
}
