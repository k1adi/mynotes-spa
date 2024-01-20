// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/note/SearchBar';
import NoteWrapper from '../components/note/NoteWrapper';
import ButtonAddNote from '../components/note/ButtonAddNote';

import { FindNote, noteObject, SearchNote } from '../utils/data-notes';

import { FaPencil } from 'react-icons/fa6';
import NoteModal from '../components/note/NoteModal';

function NotePageWrapper (props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const label = searchParams.get('label');

  function changeSearchParams(keyword, label) {
    setSearchParams({keyword, label});
  }

  return (
    <NotePage 
      notes={props.notes}
      currentLabel={label}
      currentKeyword={keyword}
      onLoading={props.onLoading}
      paramsChange={changeSearchParams}
      saveNoteHandler={props.onSaveNote}
      editNoteHandler={props.onEditNote}
      deleteNoteHandler={props.onDeleteNote}
    />
  );
}

class NotePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedNote: noteObject,
      modalAddIsVisible: false,
      modalEditIsVisible: false,
      label: props.currentLabel || '',
      keyword: props.currentKeyword || '',
    };

    this.onSearchParamsHandler = this.onSearchParamsHandler.bind(this);
    this.onToggleModalAddHanlder = this.onToggleModalAddHanlder.bind(this);
    this.onToggleModalEditHanlder = this.onToggleModalEditHanlder.bind(this);
  }

  onSearchParamsHandler({title, label}) {
    this.setState({ keyword: title, label }, () => {
      this.props.paramsChange(this.state.keyword, this.state.label);
    });
  }

  onToggleModalAddHanlder() {
    this.setState((prevState) => ({
      modalAddIsVisible: !prevState.modalAddIsVisible,
      selectedNote: noteObject,
    }));
  }

  onToggleModalEditHanlder(id) {
    this.setState((prevState) => ({
      modalEditIsVisible: !prevState.modalEditIsVisible,
      selectedNote: FindNote(this.props.notes, id),
    }));
  }

  render() {
    const notes = this.props.notes.filter(note => !note.archived);
    const filteredNotes = SearchNote(notes, this.state.keyword, this.state.label);

    return (
      <div className='container--wrap container--padding-y'>
        {this.state.modalAddIsVisible && (
          <NoteModal
            formName='Add'
            note={this.state.selectedNote}
            onLoading={this.props.onLoading}
            onHideModal={this.onToggleModalAddHanlder}
            isModalVisible={this.state.modalAddIsVisible}
            formSubmitHandler={this.props.saveNoteHandler}
          />
        )}

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

        <div className='wrapper--add-note'>
          <ButtonAddNote 
            classList='button button--main button--large'
            btnIcon={<FaPencil className='icon'/>}
            btnText='Create New Note'
            onShowModalHandler={this.onToggleModalAddHanlder}
          />
        </div>

        <NoteWrapper 
          pageName='Note'
          notes={filteredNotes}
          onLoading={this.props.onLoading}
          onShowModalHandler={this.onToggleModalEditHanlder}
          onDeleteHandler={this.props.deleteNoteHandler}
        />
      </div>
    );
  }
}

NotePageWrapper.propTypes = {
  notes: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  onSaveNote: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

NotePage.propTypes =  {
  currentLabel: PropTypes.string,
  currentKeyword: PropTypes.string,
  notes: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  paramsChange: PropTypes.func.isRequired,
  saveNoteHandler: PropTypes.func.isRequired,
  editNoteHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
};

export default NotePageWrapper;