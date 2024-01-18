// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

import { convertTitle, getSelectedNote, showFormattedDate } from '../utils/data-notes';
import NotFoundPage from './NotFoundPage';
import { getInitialLabel, getLabelHexCode, getLabelName } from '../utils/data-label';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa6';

function DetailPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedNote = getSelectedNote(props.notes, id);

  const labels = getInitialLabel();
  const hexCode = getLabelHexCode(labels, selectedNote.label);
  const labelName = getLabelName(labels, selectedNote.label);

  const labelColor = { color: hexCode };
  const borderTop = { borderTop: `solid 3px ${hexCode}` };
  const buttonBack = { backgroundColor: hexCode };

  const goBack = () => {
    navigate(-1);
  };

  const currentUrl = window.location.href;
  const urlTtile = convertTitle(selectedNote.title);
  const shareLinks = [
    { icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${urlTtile}%0A${currentUrl}` },
    { icon: <FaFacebookF />, url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}` },
    { icon: <FaXTwitter />, url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${urlTtile}` },
    { icon: <FaLinkedin />, url: `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${urlTtile}` },
  ];

  return (
    <>
      {selectedNote ? (
        <div className='container--note container--padding-y'>
          <div className='card-detail' style={borderTop}>
            <small className='text__label' style={labelColor}> { labelName } </small>
            <h3 className='text__heading'> {selectedNote.title} </h3>
            <p className='text__date'> { showFormattedDate(selectedNote.createdAt) } </p>
            <div className='text__desc' dangerouslySetInnerHTML={{ __html: selectedNote.richText }} />
            { selectedNote.updatedAt && (
              <p className='text__date text__italic'>Last Modified: { showFormattedDate(selectedNote.updatedAt) }</p>
            )}

            <p className='icon-text'>Share this note</p>
            {shareLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className='icon-share'>
                {link.icon}
              </a>
            ))}

            <div className='text__right'>
              <button
                style={buttonBack}
                className='button button--back button--large'
                onClick={goBack}
              >
                <FaAngleLeft /> Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

DetailPage.propTypes = {
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
};

export default DetailPage;