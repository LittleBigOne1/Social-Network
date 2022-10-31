import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../Validations/UserValidation';

export default function Signup() {
   const navigate = useNavigate();
   const { register, handleSubmit, formState } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(userSchema),
   });
   const { errors } = formState;
   const onSubmit = (data) => {
      console.log(data);
      axios
         .post('http://localhost:3000/api/auth/signup', data)
         .then((response) => {
            console.log(response);
            console.log(response.status);

            alert('Inscription réussite !');
            navigate('/login');
         })
         .catch((error) => {
            console.log(error);
         });
   };

   //  const createUser = (e) => {
   //     e.preventDefault();
   //     // console.log(e);
   //     // console.log(e.target);
   //     console.log(e.target['firstName'].value);
   //     console.log(e.target['lastName'].value);
   //     console.log(e.target['email'].value);
   //     console.log(e.target['password'].value);
   //     // console.log(e.target[1].value);
   //     try {
   //        const userInfo = {
   //           firstName: e.target['firstName'].value,
   //           lastName: e.target['lastName'].value,
   //           email: e.target['email'].value,
   //           password: e.target['password'].value,
   //        };
   //        console.log(userInfo);

   //         axios
   //            .post('http://localhost:3000/api/auth/signup', userInfo)
   //            .then(function (response) {
   //               console.log(response);
   //               console.log(response.status);
   //               if (response.status === 201) {
   //                  navigate('/');
   //               } else {

   //               }
   //            })
   //            .catch(function (error) {
   //               console.log(error);
   //            });
   //     } catch (err) {}
   //  };
   return (
      <>
         <h1>Groupomania</h1>
         <h2>Inscription</h2>
         {/* <SVG/> */}
         <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <input
               name="firstName"
               type="text"
               className="login-input"
               placeholder="Prénom"
               {...register('firstName')}
            />
            <small> {errors.firstName?.message} </small>
            <input
               name="lastName"
               type="text"
               className="login-input"
               placeholder="Nom"
               required
               {...register('lastName')}
            />
            <small> {errors.lastName?.message} </small>
            <input
               name="email"
               type="email"
               placeholder="Email"
               className="login-input"
               {...register('email')}
            />
            <small> {errors.email?.message} </small>
            <input
               name="password"
               type="password"
               placeholder="Mot de passe"
               className="login-input"
               {...register('password')}
            ></input>
            <small> {errors.password?.message} </small>
            <input
               name="confirmPassword"
               type="password"
               placeholder="Confirmez le mot de passe"
               className="login-input"
               {...register('confirmPassword')}
            ></input>
            <small>{errors.confirmPassword?.message}</small>
            <button>Se connecter</button>
         </form>
         <div className="signup"></div>
         <p>
            Déjà inscrit ? <Link to="/login">Se connecter !</Link>{' '}
         </p>
      </>
   );
}
