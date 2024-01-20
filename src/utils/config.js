import { Bounce } from 'react-toastify';

const CONFIG = {
  STORAGE_NOTES: 'mynotes-kiadi-v2',
  STORAGE_THEME: 'mynotes-theme',
  TOAST_EMITTER: {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  }
};

export default CONFIG;
