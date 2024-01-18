// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import NotesLogo from '../assets/mynotes-logo.png';

function AppNavbar({ onToggleTheme, iconTheme}) {
  const location = useLocation();
  const links = [
    { to: '/note', label: 'Note' },
    { to: '/archive', label: 'Archive' },
  ];

  const [isNavShown, setIsNavShown] = useState(false);
  const handleNavToggle = (event) => {
    event.stopPropagation();
    setIsNavShown(!isNavShown);
  };

  return (
    <nav className='nav'>
      <button className='nav__toggle' onClick={handleNavToggle}>
        <div className={`hamburger-menu ${isNavShown ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <span className='nav__menu'>
        <Link to="/" className='nav__logo'>
          <img src={NotesLogo} alt='MyNotes Logo' />
        </Link>

        <ul className={`nav__list ${isNavShown ? 'is-shown' : ''}`}>
          {links.map((link, index) => (
            <li key={index} className={location.pathname === link.to ? 'active' : ''}>
              <Link to={link.to} onClick={handleNavToggle}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </span>

      <button className='nav__theme' onClick={() => onToggleTheme()}>
        <img src={iconTheme} alt='Icon Theme' />
      </button>
    </nav>  
  );
}

AppNavbar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  iconTheme: PropTypes.string.isRequired,
};

export default AppNavbar;