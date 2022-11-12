import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Logo from '../../assets/images/icon-colored.png';

export default function Login(props) {
  const navigate = useNavigate();
  // durée en millisecondes, ici = 1 jours
  const maxAge = 1000 * 60 * 60 * 24;
  const [messageError, setMessageError] = useState('');
  const [cookies, setCookie] = useCookies([]);

  // fonction d'envoie du formulaire de connexion
  const handleForm = (e) => {
    e.preventDefault();

    // création de l'objet à en envoyer
    const userInfo = {
      email: e.target['email'].value,
      password: e.target['password'].value,
    };
    // axios post pour envoyer les informations de connexion
    axios
      .post('/auth/login', userInfo)
      .then((data) => {
        setCookie('token', data.data.token, {
          path: '/',
          maxAge: maxAge,
        });
        setCookie('userId', data.data.userId.split('').reverse().join(''), {
          path: '/',
          maxAge: maxAge,
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setMessageError('La paire identifiant/mot de passe est incorrecte');
      });
  };

  return (
    <>
      <img className={styles.logo} src={Logo} alt="" />

      <form className={styles.form} onSubmit={handleForm}>
        <h1 className={styles.title}>Connexion</h1>
        <input
          title="Email"
          name="email"
          type="email"
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          title="Mot de passe"
          name="password"
          type="password"
          placeholder="Mot de passe"
          className={styles.input}
          required
        ></input>
        {messageError && <p className={styles.loginError}>{messageError}</p>}

        <button className={styles.button}>Se connecter</button>
      </form>
      <p className={styles.switchPage}>
        Pas encore inscrit ? <Link to="/signup">Inscrivez vous !</Link>
      </p>
    </>
  );
}
