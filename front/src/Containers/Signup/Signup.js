import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../Validations/UserValidation';
import styles from '../Login/Login.module.css';

import Logo from '../../assets/images/icon-colored.png';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

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
      .post('/auth/signup', data)
      .then((res) => {
        alert('Inscription validée !');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <img className={styles.logo} src={Logo} alt="" />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Inscription</h1>

        <input
          name="firstName"
          type="text"
          className={styles.input}
          placeholder="Prénom"
          {...register('firstName')}
        />
        <p className={styles.signupError}> {errors.firstName?.message} </p>
        <input
          name="lastName"
          type="text"
          className={styles.input}
          placeholder="Nom"
          required
          {...register('lastName')}
        />
        <p className={styles.signupError}> {errors.lastName?.message} </p>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={styles.input}
          {...register('email')}
        />
        <p className={styles.signupError}> {errors.email?.message} </p>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className={styles.input}
          {...register('password')}
        ></input>
        <p className={styles.signupError}> {errors.password?.message} </p>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmez le mot de passe"
          className={styles.input}
          {...register('confirmPassword')}
        ></input>
        <p className={styles.signupError}>{errors.confirmPassword?.message}</p>
        <button className={styles.button}>S'inscrire</button>
      </form>
      <p className={styles.switchPage}>
        Déjà inscrit ? <Link to="/login">Se connecter !</Link>{' '}
      </p>
    </>
  );
}
