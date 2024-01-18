// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';

function NoteWrapper({ notes, pageName }) {
  return (
    <div className='card__wrapper'>
      { notes.length !== 0 ? 
        notes.map(item => (
          <NoteCard
            key={item.id} 
            note={item}
          />
        ))
        :
        <div className='card__message'>
          {pageName} is empty
        </div>
      }
    </div>
  );
}

NoteWrapper.propTypes = {
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
  pageName: PropTypes.string.isRequired
};


export default NoteWrapper;

