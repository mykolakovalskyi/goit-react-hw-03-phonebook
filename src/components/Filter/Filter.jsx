import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default class Filter extends Component {
  setFilterValue = e => {
    let value = e.currentTarget.value.toLowerCase();
    this.props.setFilter(value);
  };

  render() {
    return (
      <div className={css.filter}>
        <label htmlFor="filter" className={css.filterLabel}>
          Find contact by name
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          onChange={this.setFilterValue}
          className={css.filterInput}
        ></input>
      </div>
    );
  }
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
