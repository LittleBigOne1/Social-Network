import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from '../../assets/images/logout.svg';
import styles from './LogOutLogout.module.css'

export default function LogOut() {
   const navigate = useNavigate();
   const handleLogout = () => {
      try {
         axios.get('/auth/logout').then(() => {
            navigate('/login');
         });
      } catch (err) {
         console.log('catch handleForm logout', err);
      }
   };

   return (
      <>
        <img onClick={handleLogout} className={styles.logout} src={Logout} alt='Se déconnecter' />
         {/* <p onClick={handleLogout}>Se déconnecter</p> */}
         {/* <Logout /> */}
        
      </>
   );
}
