import React from 'react'
import { useNavigate,Link } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Groupomania</h1>
      <h2>Inscription</h2>
      {/* <SVG/> */}
      <form className='form-login'>
        <input type="text" className='login-input' placeholder='Prénom'/>
        <input type="text" className='login-input' placeholder='Nom'/>
        <input
          placeholder="Email"
          //   onChange={(e) => linkedInput(e.target.value)}
          type="email"
          //   value={stateInput}
          className="login-input"
        />
        <input placeholder="Mot de passe" type="password" className="login-input"
        ></input>
      <button className="">Se connecter</button>
      <div className="signup"></div>
      <p>
          Déjà inscrit ? <Link to="/login">Se connecter !</Link>{' '}
        </p>
      </form>
    </>
  )
}
