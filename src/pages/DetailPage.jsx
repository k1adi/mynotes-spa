// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

import CONFIG from '../utils/config';
import { ConvertTitle, FindNote, ShowFormattedDate } from '../utils/data-notes';
import { GetInitialLabel, GetLabelHexCode, GetLabelName } from '../utils/data-label';

import { FaCopy } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

function DetailPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const labels = GetInitialLabel();
  const [note, setNote] = useState();
  const [hexCode, setHexCode] = useState();
  const [labelName, setLabelName] = useState();
  const [urlTitle, setUrlTitle] = useState();

  useEffect(() => {
    const selectedNote = FindNote(props.notes, id);
    setNote(selectedNote);

    if (!selectedNote) {
      navigate('/not-found');
    } else {
      setHexCode(GetLabelHexCode(labels, selectedNote.label));
      setLabelName(GetLabelName(labels, selectedNote.label));
      setUrlTitle(ConvertTitle(selectedNote.title));
    }
  }, [id, navigate, labels, props.notes]);

  const labelColor = { color: hexCode };
  const borderTop = { borderTop: `solid 3px ${hexCode}` };
  const buttonBack = { backgroundColor: hexCode };

  const goBack = () => {
    navigate(-1);
  };

  const handleCopyLink = (evt) => {
    evt.preventDefault();
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL)
      .then(() => {
        toast.success('URL copied to clipboard', CONFIG.TOAST_EMITTER);
      })
      .catch(() => {
        toast.error('Error copying URL to clipboard', CONFIG.TOAST_EMITTER);
      });
  };

  const currentUrl = window.location.href;
  const shareLinks = [
    { name: 'whatsapp', icon: <FaSquareWhatsapp />, url: `https://api.whatsapp.com/send?text=${urlTitle}%0A${currentUrl}` },
    { name: 'facebook', icon: <FaSquareFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}` },
    { name: 'x-twitter', icon: <FaSquareXTwitter />, url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${urlTitle}` },
  ];

  return (
    <>
      <div className='container--note container--padding-y'>
        {note && (
          <div className='card-detail' style={borderTop}>
            <small className='text__label' style={labelColor}> { labelName } </small>
            <h3 className='text__heading'> {note.title} </h3>
            <p className='text__date'> { ShowFormattedDate(note.createdAt) } </p>
            <div className='text__desc' dangerouslySetInnerHTML={{ __html: note.body }} />
            { note.updatedAt && (
              <p className='text__date text__italic'>Last Modified: { ShowFormattedDate(note.updatedAt) }</p>
            )}

            <p className='icon-text'>Share this note</p>
            {shareLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`icon-share icon--${link.name}`}
              >
                {link.icon}
              </a>
            ))}
            <a href="" className='icon-share' onClick={handleCopyLink}>
              <FaCopy />
            </a>

            <div className='text__right'>
              <button
                style={buttonBack}
                className='button button--back button--large'
                onClick={goBack}
              >
                <FaAngleLeft /> Back
              </button>
            </div>

            <ToastContainer />
          </div>
        )}
      </div>
    </>
  );
}

DetailPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      plainBody: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default DetailPage;