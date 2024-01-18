// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { getInitialLabel } from '../utils/data-label';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: getInitialLabel(),
      title: this.props.keyword || '',
      label: this.props.label || '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
  }

  onKeywordChange(evt) {
    this.setState(prevState => ({
      title: evt.target.value,
      label: prevState.label
    }), () => {
      this.props.onStartSearchHandler(this.state);
    });
  }

  
  onLabelChange(evt) {
    this.setState(prevState => ({
      title: prevState.title,
      label: evt.target.value,
    }), () => {
      this.props.onStartSearchHandler(this.state);
    });
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    this.props.onStartSearchHandler(this.state);
  }

  render() {
    return (
      <form 
        className='form__wrapper form--search' 
        onSubmit={this.onFormSubmit}
      >
        <input
          type='search'
          className='form--input'
          placeholder='Find notes by title...' 
          value={this.state.title}
          onChange={this.onKeywordChange}
        />
        <select
          className='form--select'
          value={this.state.label}
          onChange={this.onLabelChange}
        >
          <option value=''>All</option>
          {
            this.state.labels.map(label => (
              <option 
                key={label.id} value={label.id}
              >
                {label.name}
              </option>
            ))
          }
        </select>
      </form>
    );
  }
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  label: PropTypes.string,
  onStartSearchHandler: PropTypes.func.isRequired,
};

export default SearchBar;
