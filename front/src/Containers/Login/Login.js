import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// import SVG from '../../assets/groupomania.svg';

export default function Login(props) {
   const navigate = useNavigate();
   // durée en millisecondes, ici = 7 jours
   const maxAge = 1000 * 60 * 60 * 24 * 7;

   const [cookies, setCookie] = useCookies([]);

   const handleForm = (e) => {
      e.preventDefault();
      //  console.log(e.target[0].value);
      // console.log(e.target[1].value);
      try {
         const userInfo = {
            email: e.target['email'].value,
            password: e.target['password'].value,
         };

         axios
            .post('http://localhost:3000/api/auth/login', userInfo)
            .then((data) => {
               console.log(data);

               setCookie('token', data.data.token, {
                  path: '/',
                  maxAge: maxAge,
               });
               setCookie(
                  'userId',
                  data.data.userId.split('').reverse().join(''),
                  {
                     path: '/',
                     maxAge: maxAge,
                  }
               );
            })
            .then(() => {
               console.log('avant navigate login');
               // navigate('/')
            })
            .catch((err) => {
               console.log('catch axios post login', err);
            });
      } catch (err) {
         console.log('catch handleForm login', err);
      }
   };

   return (
      <>
         <h1>Groupomania</h1>
         <h2>Connexion</h2>
         {/* <SVG/> */}

         <form className="form-login" onSubmit={handleForm}>
            <input
               name="email"
               type="email"
               placeholder="entrez votre email"
               className="login-input"
               required
            />
            <input
               name="password"
               type="password"
               placeholder="entrez votre mot de passe"
               className="login-input"
               required
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
