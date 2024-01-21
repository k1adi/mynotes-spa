// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/note/SearchBar';
import NoteWrapper from '../components/note/NoteWrapper';

import { findNote, searchNote, noteObject, getArchivedNotes } from '../utils/data-notes';
import NoteModal from '../components/note/NoteModal';

function ArchivePageWrapper (props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const label = searchParams.get('label');

  function changeSearchParams(keyword, label) {
    setSearchParams({keyword, label});
  }

  return (
    <ArchivePage 
      notes={props.notes}
      currentLabel={label}
      currentKeyword={keyword}
      onLoading={props.onLoading}
      paramsChange={changeSearchParams}
      editNoteHandler={props.onEditNote}
      deleteNoteHandler={props.onDeleteNote}
    />
  );
}

class ArchivePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedNote: noteObject,
      modalEditIsVisible: false,
      label: props.currentLabel || '',
      keyword: props.currentKeyword || '',
    };

    this.onSearchParamsHandler = this.onSearchParamsHandler.bind(this);
    this.onToggleModalEditHanlder = this.onToggleModalEditHanlder.bind(this);
  }

  onSearchParamsHandler({title, label}) {
    this.setState({ keyword: title, label }, () => {
      this.props.paramsChange(this.state.keyword, this.state.label);
    });
  }

  onToggleModalEditHanlder(id) {
    this.setState((prevState) => ({
      modalEditIsVisible: !prevState.modalEditIsVisible,
      selectedNote: findNote(id),
    }));
  }

  render() {
    const notes = getArchivedNotes();
    const filteredNotes = searchNote(notes, this.state.keyword, this.state.label);

    return (
      <div className='container--wrap container--padding-y'>
        {this.state.modalEditIsVisible && (
          <NoteModal
            formName='Edit'
            note={this.state.selectedNote}
            onLoading={this.props.onLoading}
            onHideModal={this.onToggleModalEditHanlder}
            isModalVisible={this.state.modalEditIsVisible}
            formSubmitHandler={this.props.editNoteHandler}
          />
        )}

        <div className='wrapper--search-note'>
          <SearchBar 
            keyword={this.state.keyword}
            label={this.state.label} 
            onStartSearchHandler={this.onSearchParamsHandler} 
          />
        </div>

        <NoteWrapper 
          pageName='Archive'
          notes={filteredNotes}
          onLoading={this.props.onLoading}
          onShowModalHandler={this.onToggleModalEditHanlder}
          onDeleteHandler={this.props.deleteNoteHandler}
        />
      </div>
    );
  }
}

ArchivePageWrapper.propTypes = {
  notes: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

ArchivePage.propTypes =  {
  currentLabel: PropTypes.string,
  currentKeyword: PropTypes.string,
  notes: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  paramsChange: PropTypes.func.isRequired,
  editNoteHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;