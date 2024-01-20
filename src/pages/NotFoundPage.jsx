// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../assets/not-found.svg';

function NotFoundPage() {

  return (
    <div className='container--wrap'>
      <div className="not-found__wrapper">
        <img src={NotFound} className='not-found__image' alt="Not Found Ilustration" />
        <h1 className='not-found__title'>Oops...</h1>
        <p>The page you are looking for is not found.</p>
        <Link to='/' className='button button--main button--large'>Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;