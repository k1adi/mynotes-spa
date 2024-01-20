import CONFIG from './config';
import { initialNotes } from './data-notes';

const isWebStorageAvailable = () => {
  if (typeof (Storage) === 'undefined') {
    return false;
  }

  return true;
};

const SaveNotes = (notes) => {
  localStorage.setItem(CONFIG.STORAGE_NOTES, JSON.stringify(notes));
};

// Check local storage first, and save initial data 
const checkNote = () => {
  if (localStorage.getItem(CONFIG.STORAGE_NOTES) === 'undefined' || localStorage.getItem(CONFIG.STORAGE_NOTES) === null) {
    SaveNotes(initialNotes);
  }
};

const GetNotes = () => {
  let localData = initialNotes;

  if (isWebStorageAvailable()) {
    checkNote();
    const getLocalData = localStorage.getItem(CONFIG.STORAGE_NOTES);
    localData = JSON.parse(getLocalData);
  }

  return localData;
};

const SaveTheme = (theme) => {
  if (isWebStorageAvailable()) {
    localStorage.setItem(CONFIG.STORAGE_THEME, theme);
  }
};

const GetTheme = () => {
  if (localStorage.getItem(CONFIG.STORAGE_THEME) === null) {
    SaveTheme('light');

    return localStorage.getItem(CONFIG.STORAGE_THEME);
  }

  return 'light';
};

export { SaveNotes, GetNotes, SaveTheme, GetTheme };
