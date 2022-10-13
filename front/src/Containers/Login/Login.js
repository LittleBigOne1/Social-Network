import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

import SVG from '../../assets/groupomania.svg';

export default function Login() {

  return (
    <>
      <h1>Groupomania</h1>
      <h2>Connexion</h2>
      {/* <SVG/> */}
      <form className="form-login">
        <input
          placeholder="entrez votre email"
          //   onChange={(e) => linkedInput(e.target.value)}
          type="email"
          //   value={stateInput}
          className="login-input"
        />
        <input
          placeholder="entrez votre mot de passe"
          type="password"
          className="login-input"
        ></input>
        <button className="">Se connecter</button>
        <div className="signup"></div>
        <p>
          Pas encore inscrit ? <Link to="/signup">Inscrivez vous !</Link>{' '}
        </p>
        
      </form>
    </>
  );
}
