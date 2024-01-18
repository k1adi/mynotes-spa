// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import NoteWrapper from '../components/NoteWrapper';

import { searchNote } from '../utils/data-notes';

function ArchivePageWrapper (props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const label = searchParams.get('label');

  function changeSearchParams(keyword, label) {
    setSearchParams({keyword, label});
  }

  return <ArchivePage notes={props.notes} currentKeyword={keyword} currentLabel={label} paramsChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      notes: props.notes,
      keyword: props.currentKeyword || '',
      label: props.currentLabel || '',
    };

    this.onSearchParamsHandler = this.onSearchParamsHandler.bind(this);
  }

  onSearchParamsHandler({title, label}) {
    this.setState({ keyword: title, label }, () => {
      this.props.paramsChange(this.state.keyword, this.state.label);
    });
  }

  render() {
    const notes = this.state.notes.filter(note => note.archived);
    const filteredNotes = searchNote(notes, this.state.keyword, this.state.label);

    return (
      <div className='container--wrap container--padding-y'>
        <div className='wrapper--search-note'>
          <SearchBar 
            keyword={this.state.keyword}
            label={this.state.label} 
            onStartSearchHandler={this.onSearchParamsHandler} 
          />
        </div>

        <NoteWrapper 
          notes={filteredNotes}
          pageName='Archive'
        />
      </div>
    );
  }
}

ArchivePageWrapper.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      richText: PropTypes.string.isRequired,
      plainText: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired
};

ArchivePage.propTypes =  {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      richText: PropTypes.string.isRequired,
      plainText: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  currentKeyword: PropTypes.string,
  currentLabel: PropTypes.string,
  paramsChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;