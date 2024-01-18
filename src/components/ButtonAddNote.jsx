// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function ButtonAddNote({ classList, btnIcon, btnText }) {
  return (
    <button className={classList}>
      {btnIcon} 
      {btnText}
    </button>
  );
}

ButtonAddNote.propTypes = {
  classList: PropTypes.string.isRequired,
  btnIcon: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default ButtonAddNote;
