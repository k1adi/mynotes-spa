// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {

  return (
    <div className='container--wrap'>
      <p>Not Found Page</p>
      <Link to='/' className='button button--main button--large'>Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;