// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { showFormattedDate } from '../utils/data-notes';
import { getInitialLabel, getLabelName, getLabelHexCode } from '../utils/data-label';

import { FaPenToSquare } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';

function NoteCard ({ note }) {
  const labels = getInitialLabel();
  const hexCode = getLabelHexCode(labels, note.label);
  const labelName = getLabelName(labels, note.label);

  const cardStyle = {
    color: hexCode
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <div className='card__note'>
      <div className='card__note__body' onClick={handleClick}>
        <small style={cardStyle}> { labelName } </small>
        <h3 className='text__title'> { note.title } </h3>
        <p className='text__date'> { showFormattedDate(note.createdAt) } </p>
        <p className='text__desc'> { note.plainText.length > 150 ? 
          `${note.plainText.substring(0, 150)}...` : note.body
        } 
        </p>
      </div>
      <div className='card__note__footer'>
        <button 
          className='button button--edit'
        > 
          <FaPenToSquare className='icon'/>
          <span>edit</span>
        </button>
        <button
          className='button button--delete'
        > 
          <FaTrashCan className='icon' /> 
          <span>delete</span>
        </button>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteCard;
