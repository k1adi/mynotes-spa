// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';

function NoteWrapper({ notes, pageName, onLoading, onShowModalHandler, onDeleteHandler }) {
  return (
    <div className='card__wrapper'>
      { notes.length !== 0 ? 
        notes.map(item => (
          <NoteCard
            key={item.id} 
            note={item}
            onLoading={onLoading}
            onDelete={onDeleteHandler}
            onEdit={onShowModalHandler}
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
  notes: PropTypes.array.isRequired,
  onLoading: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onShowModalHandler: PropTypes.func.isRequired
};


export default NoteWrapper;

