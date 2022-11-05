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
        <small> {errors.firstName?.message} </small>
        <input
          name="lastName"
          type="text"
          className={styles.input}
          placeholder="Nom"
          required
          {...register('lastName')}
        />
        <small> {errors.lastName?.message} </small>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={styles.input}
          {...register('email')}
        />
        <small> {errors.email?.message} </small>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className={styles.input}
          {...register('password')}
        ></input>
        <small> {errors.password?.message} </small>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmez le mot de passe"
          className={styles.input}
          {...register('confirmPassword')}
        ></input>
        <small>{errors.confirmPassword?.message}</small>
        <button className={styles.button}>S'inscrire</button>
      </form>
      <p className={styles.p}>
        Déjà inscrit ? <Link to="/login">Se connecter !</Link>{' '}
      </p>
    </>
  );
}
