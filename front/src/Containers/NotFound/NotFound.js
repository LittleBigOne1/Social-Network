import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops, cette page n'existe pas !</h1>
      <button onClick={() => navigate('/')}>Retourner à l'accueil</button>
    </div>
  );
}
