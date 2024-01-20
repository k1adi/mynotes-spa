import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import { GetInitialLabel } from '../../utils/data-label';
import 'react-quill/dist/quill.snow.css';

class NoteModal extends React.Component {
  constructor(props) {
    super(props);
    const { id, label, title, body, plainBody, archived } = this.props.note;

    this.state = {
      id,
      label,
      title,
      body,
      plainBody,
      archived,
      titleLength: 0,
      currentNote: this.props.note,
    };

    this.onQuillChange = this.onQuillChange.bind(this);
    this.onInputTitleHandler = this.onInputTitleHandler.bind(this);
    this.onSubmitFormHandler = this.onSubmitFormHandler.bind(this);
  }

  onQuillChange(value) {
    this.setState(() => ({
      body: value,
      plainBody: value.replace(/<[^>]*>/g, '')
    }));
  }

  onInputTitleHandler(evt) {
    if(evt.target.value.length <= 50) {
      this.setState(() => ({
        title: evt.target.value,
        titleLength: evt.target.value.length
      }));
    }
  }

  onSubmitFormHandler(evt) {
    evt.preventDefault();
    this.props.onHideModal();
    this.props.onLoading();

    setTimeout(() => {
      this.props.onLoading();
      this.props.formSubmitHandler(this.state);
    }, 1250);
  }

  render() {
    const labels = GetInitialLabel();

    return (
      <div className={`modal__wrapper ${this.props.isModalVisible ? '' : 'hide'} `}>
        <div className='modal__content'>
          <div className='modal__card'>
            <div className='modal__card__header'>
              <h2 className='modal__card__title'>{`${this.props.formName} Note`}</h2>
              <button 
                className='modal__card__close'
                onClick={() => this.props.onHideModal()}
              >
                ✕
              </button>
            </div>

            <div className='modal__card__body'>
              <form 
                className='form__wrapper'
                onSubmit={this.onSubmitFormHandler}
              >
                <div className='input-wrapper'>
                  <label htmlFor="noteLabel">Label</label>
                  <select
                    id='noteLabel'
                    className='form--select'
                    value={this.state.label}
                    onChange={(evt) => this.setState({label: evt.target.value})}
                    required
                  >

                    {this.props.formName == 'Add' && (
                      <option value="1" disabled>Select a Label</option>
                    )}

                    {
                      labels.map(label => (
                        <option 
                          key={label.id} 
                          value={label.id}
                        >
                          {label.name}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className='input-wrapper'>
                  <label htmlFor="noteTitle">Title</label>
                  <input 
                    type='text' name='noteTitle' id='noteTitle'
                    placeholder='Note title...'
                    className='form--input'
                    value={this.state.title}
                    onChange={this.onInputTitleHandler}
                    required
                  />
                  <small className='form--help'>
                    <span>{this.state.titleLength}</span>/50
                  </small>
                </div>

                <div className='input-wrapper'>
                  <label htmlFor="noteDesc">Description</label>
                  <ReactQuill
                    value={this.state.body}
                    onChange={this.onQuillChange}
                    placeholder='Note Description...'
                  />
                </div>
              
                { this.props.formName === 'Edit' && (
                  <div className='input-wrapper'>
                    <input 
                      type="checkbox" name="noteArchive" id="noteArchive"
                      className='form--checkbox'
                      checked={this.state.archived}
                      onChange={(evt) => this.setState({ archived: evt.target.checked })}
                    />
                    <label htmlFor="noteArchive">Archive</label>
                  </div>
                )}

                <div className='form__button'>
                  <input 
                    type='submit' 
                    className='button button--main'
                    value={this.props.formName === 'Add' ? 'Submit' : 'Update'}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

NoteModal.propTypes = {
  note: PropTypes.object.isRequired,
  onLoading: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  onHideModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
};

export default NoteModal;
