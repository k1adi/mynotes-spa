// eslint-disable-next-line no-unused-vars
import React from 'react';
import Loader from '../../assets/loader.svg';

function LoaderScreen() {
  return (
    <div className='loader__wrapper'> 
      <img src={Loader} alt="Loader animation" />
    </div>
  );
}

export default LoaderScreen;
