import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from'./Navbar.module.css';
import Logo from '../../assets/images/icon-left-font-monochrome-white.png'
import LogOut from '../LogOut/LogOut'

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };
  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <>
      <nav>
       
          <div className={styles.logoContainer}>

                
              <img className={styles.logo} src={Logo} alt="" />
          
            
            


          </div>
              <div className={styles.logout}>
              <LogOut className ={styles.logoutButton}/>
              </div>
        
      </nav>
    </>
  );
}
