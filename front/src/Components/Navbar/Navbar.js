import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/icon-left-font-monochrome-white.png'

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
        {(toggleMenu || largeur > 500) && (
          <div className="liste">
            <NavLink
              // className={({ isActive }) =>
              //   isActive ? 'activeLink items' : 'items'
              // }
              to="/"
            >
              <img src="front/src/assets/icon-left-font-monochrome-white.png" alt="" />
              {/* <Logo/> */}
            </NavLink>
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
        )}
        <svg onClick={toggleNav} viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </nav>
    </>
  );
}
