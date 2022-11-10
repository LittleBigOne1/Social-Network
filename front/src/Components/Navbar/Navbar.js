import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../../assets/images/icon-left-font-monochrome-white.png';
import LogOut from '../LogOut/LogOut';

export default function Navbar() {
  return (
    <>
      <nav>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={Logo} alt="logo groupomania"/>
        </div>
        <div className={styles.logout}>
          <LogOut className={styles.logoutButton} />
        </div>
      </nav>
    </>
  );
}
