import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
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
        {/* {(toggleMenu || largeur > 500) && ( */}
          <div className="liste">

            <NavLink
              // className={({ isActive }) =>
              //   isActive ? 'activeLink items' : 'items'
              // }
              to="/"
            >
              Accueil
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'activeLink items' : 'items'
              }
              to="/publier/"
            >
              Publier
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'activeLink items' : 'items'
              }
              to="/"
            >
              Contact
            </NavLink>
            


          </div>
              <div className='logout'>
              <LogOut/>
              </div>
        
      </nav>
    </>
  );
}
