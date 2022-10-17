import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

import SVG from '../../assets/groupomania.svg';

export default function Login() {
   const handleForm = (e) => {
      e.preventDefault();
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      try {
         const userInfo = {
            email: e.target[0].value,
            password: e.target[1].value,
         };
         console.log(userInfo);
      } catch (err) {}
   };

   return (
      <>
         <h1>Groupomania</h1>
         <h2>Connexion</h2>
         {/* <SVG/> */}

         <form className="form-login" onSubmit={handleForm}>
            <input
               placeholder="entrez votre email"
               //   onChange={(e) => linkedInput(e.target.value)}
               type="email"
               required
               //   value={stateInput}
               className="login-input"
            />
            <input
               placeholder="entrez votre mot de passe"
               required
               type="password"
               className="login-input"
            ></input>
            <button className="">Se connecter</button>
            <div className="signup"></div>
         </form>
         <p>
            Pas encore inscrit ? <Link to="/signup">Inscrivez vous !</Link>{' '}
         </p>
      </>
   );
}
