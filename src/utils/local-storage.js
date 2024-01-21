import CONFIG from './config';
import { notes } from './data-notes';

const isWebStorageAvailable = () => {
  if (typeof (Storage) === 'undefined') {
    return false;
  }

  return true;
};

const saveNotes = (notes) => {
  localStorage.setItem(CONFIG.STORAGE_NOTES, JSON.stringify(notes));
};

// Check local storage first, and save initial data 
const checkNote = () => {
  if (localStorage.getItem(CONFIG.STORAGE_NOTES) === 'undefined' || localStorage.getItem(CONFIG.STORAGE_NOTES) === null) {
    saveNotes(notes);
  }
};

const getNotes = () => {
  let localData = notes;

  if (isWebStorageAvailable()) {
    checkNote();
    const getLocalData = localStorage.getItem(CONFIG.STORAGE_NOTES);
    localData = JSON.parse(getLocalData);
  }

  return localData;
};

const saveTheme = (theme) => {
  if (isWebStorageAvailable()) {
    localStorage.setItem(CONFIG.STORAGE_THEME, theme);
  }
};

const getTheme = () => {
  if (localStorage.getItem(CONFIG.STORAGE_THEME) === null) {
    saveTheme('light');

    return localStorage.getItem(CONFIG.STORAGE_THEME);
  }

  return 'light';
};

export { saveNotes, getNotes, saveTheme, getTheme };
