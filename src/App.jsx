// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './layouts/AppNavbar';
import AppFooter from './layouts/AppFooter';

import SunIcon from './assets/sun-icon.png';
import MoonIcon from './assets/moon-icon.png';

import NotFoundPage from './pages/NotFoundPage';
import ArchivePageWrapper from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import NotePageWrapper from './pages/NotePage';
import LoaderScreen from './components/ui/LoaderScreen';

import { getTheme, saveTheme } from './utils/local-storage';
import { addNote, deleteNote, editNotes, getAllNote, toggleArchiveNote } from './utils/data-notes';

import { ToastContainer, toast } from 'react-toastify';
import CONFIG from './utils/config';

class App extends React.Component {
  constructor(props) {    
    super(props);

    const currentIcon = getTheme() === 'light' ? SunIcon : MoonIcon;

    this.state = {
      notes: getAllNote(),
      isLoadingTime: false,
      iconTheme: currentIcon,
      currentTheme: getTheme(),
    };

    this.onToggleThemeHandler = this.onToggleThemeHandler.bind(this);
    this.onLoadingScreenHandler = this.onLoadingScreenHandler.bind(this);

    this.onSaveNoteHandler = this.onSaveNoteHandler.bind(this);
    this.onEditNoteHandler = this.onEditNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onToggleArchiveHandler = this.onToggleArchiveHandler.bind(this);
  }

  onToggleThemeHandler() {
    this.setState((prevState) => ({
      currentTheme: prevState.currentTheme === 'light' ? 'dark' : 'light',
      iconTheme: prevState.iconTheme === SunIcon ? MoonIcon : SunIcon,
    }), () => {
      saveTheme(this.state.currentTheme);
    });
  }

  onLoadingScreenHandler(){
    this.setState((prevState) => ({
      isLoadingTime: !prevState.isLoadingTime
    }));
  }

  onSaveNoteHandler(note) {
    toast.success('Successfuly created a new note', CONFIG.TOAST_EMITTER);
    addNote(note);

    this.setState(() => {
      return { notes: getAllNote() };
    });
  }

  onToggleArchiveHandler(id) {
    toast.success('Successfuly updated status note', CONFIG.TOAST_EMITTER);
    toggleArchiveNote(id);

    this.setState(() => {
      return { notes: getAllNote() };
    });
  }

  onEditNoteHandler(note) {
    toast.success('Successfuly updated the note', CONFIG.TOAST_EMITTER);
    editNotes(note);

    this.setState(() => {
      return { notes: getAllNote() };
    });
  }

  onDeleteNoteHandler(id) {
    toast.success('Successfuly deleted the note', CONFIG.TOAST_EMITTER);
    deleteNote(id);

    this.setState(() => {
      return { notes: getAllNote() };
    });
  }

  render() {
    return (
      <div className={`app ${this.state.currentTheme}`}>
        {this.state.isLoadingTime && (
          <LoaderScreen />
        )}

        <header className='app__header'>
          <AppNavbar 
            onToggleTheme={this.onToggleThemeHandler} 
            iconTheme={this.state.iconTheme} 
          />
        </header>
  
        <main className='app__content'>
          <Routes>
            <Route path="/" element={
              <NotePageWrapper 
                notes={this.state.notes}
                onSaveNote={this.onSaveNoteHandler}
                onEditNote={this.onEditNoteHandler}
                onDeleteNote={this.onDeleteNoteHandler}
                onLoading={this.onLoadingScreenHandler}
              /> 
            } />

            <Route path="/archive" element={
              <ArchivePageWrapper 
                notes={this.state.notes}
                onEditNote={this.onEditNoteHandler}
                onDeleteNote={this.onDeleteNoteHandler}
                onLoading={this.onLoadingScreenHandler}
              />
            }/>

            <Route path="/note/:id" element={
              <DetailPage 
                notes={this.state.notes}
                changeStatus={this.onToggleArchiveHandler}
              />
            }/>

            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
  
        <footer className='app__footer'>
          <AppFooter />
        </footer>

        <ToastContainer style={{ maxWidth: '400px', width: '90%' }} />
      </div>
    );
  }
}

export default App;
