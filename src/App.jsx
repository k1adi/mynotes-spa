// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './layouts/AppNavbar';
import AppFooter from './layouts/AppFooter';

import SunIcon from './assets/sun-icon.png';
import MoonIcon from './assets/moon-icon.png';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ArchivePageWrapper from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import NotePageWrapper from './pages/NotePage';

import { getNotes, getTheme, saveTheme } from './utils/local-storage';

class App extends React.Component {
  constructor(props) {    
    super(props);

    const currentIcon = getTheme() === 'light' ? SunIcon : MoonIcon;

    this.state = {
      iconTheme: currentIcon,
      currentTheme: getTheme(),
      notes: getNotes(),
    };

    this.onToggleThemeHandler = this.onToggleThemeHandler.bind(this);
  }

  onToggleThemeHandler() {
    this.setState((prevState) => ({
      currentTheme: prevState.currentTheme === 'light' ? 'dark' : 'light',
      iconTheme: prevState.iconTheme === SunIcon ? MoonIcon : SunIcon,
    }), () => {
      saveTheme(this.state.currentTheme);
    });
  }

  render() {
    return (
      <div className={`app ${this.state.currentTheme}`}>

        <header className='app__header'>
          <AppNavbar 
            onToggleTheme={this.onToggleThemeHandler} 
            iconTheme={this.state.iconTheme} 
          />
        </header>
  
        <main className='app__content'>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/note" element={
              <NotePageWrapper notes={this.state.notes} /> 
            }/>

            <Route path="/archive" element={
              <ArchivePageWrapper notes={this.state.notes} />
            }/>

            <Route path="/note/:id" element={
              <DetailPage notes={this.state.notes} />
            } />

            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
  
        <footer className='app__footer'>
          <AppFooter />
        </footer>
      </div>
    );
  }
}

export default App;
