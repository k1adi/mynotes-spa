// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { showFormattedDate } from '../../utils/data-notes';
import { GetInitialLabel, GetLabelName, GetLabelHexCode } from '../../utils/data-label';

import { FaPenToSquare } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

function NoteCard ({ note, onLoading, onEdit, onDelete }) {
  const labels = GetInitialLabel();
  const hexCode = GetLabelHexCode(labels, note.label);
  const labelName = GetLabelName(labels, note.label);

  const cardStyle = {
    color: hexCode
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/note/${note.id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Note',
      text: 'Are you sure to delete this note?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#DC3545',
    }).then((result) => {
      if(result.isConfirmed){
        onLoading();

        setTimeout(() => {
          onDelete(note.id);
          onLoading();
        }, 1000);
      }
    });
  };

  const description = note.body.replace(/<[^>]*>/g, '');

  return (
    <div className='card__note'>
      <div className='card__note__body' onClick={handleClick}>
        <small style={cardStyle}> { labelName } </small>
        <h3 className='text__title'> { note.title } </h3>
        <p className='text__date'> { showFormattedDate(note.createdAt) } </p>
        <p className='text__desc'> { description.length > 150 ? 
          `${description.substring(0, 150)}...` : description
        } 
        </p>
      </div>
      <div className='card__note__footer'>
        <button 
          className='button button--edit'
          onClick={() => onEdit(note.id)}
        > 
          <FaPenToSquare className='icon'/>
          <span>edit</span>
        </button>
        <button
          className='button button--delete'
          onClick={handleDelete}
        > 
          <FaTrashCan className='icon' /> 
          <span>delete</span>
        </button>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired
};

export default NoteCard;
