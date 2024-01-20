// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function ButtonAddNote({ classList, btnIcon, btnText, onShowModalHandler }) {
  return (
    <button className={classList} onClick={() => onShowModalHandler()}>
      {btnIcon} 
      {btnText}
    </button>
  );
}

ButtonAddNote.propTypes = {
  btnIcon: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
  classList: PropTypes.string.isRequired,
  onShowModalHandler: PropTypes.func.isRequired,
};

export default ButtonAddNote;
