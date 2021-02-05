import React from 'react';
import PropTypes from 'prop-types';

class PageCounter extends React.Component {
  createPageNumberComponent(start) {
    const pageNumberComponents = [];
    let counter = 0;
    for (let pageNum = start; pageNum < Math.ceil(this.props.totalPages) && counter++ < 5; pageNum++) {
      pageNumberComponents.push((
        <a
          key={pageNum}
          style={{ marginRight: '5px', marginLeft: '5px' }}
          className={pageNum === this.props.page ? 'page-counters active-page' : 'page-counters'}
          onClick={() => this.props.handlePageClick(pageNum)}
        >
          {pageNum + 1}
        </a>
      ));
    }
    return pageNumberComponents;
  }

  render() {
    const start = this.props.page > 3 ? this.props.page - 2 : 0;
    const Next = this.props.page < this.props.totalPages - 1
      ? (
        <a onClick={this.props.next} className="pull-right hover">
          {' '}
          {'>'}
          {' '}
        </a>
      ) : '';
    const Prev = this.props.page > 1 ? (
      <a onClick={this.props.previous} className="pull-right hover">
        {' '}
        {'<'}
        {' '}
      </a>
    ) : '';
    const Counter = (
      <div className="page-counter">
        {Next}
        <div className="pull-right">
          { this.createPageNumberComponent(start) }
        </div>
        {Prev}
      </div>
    );
    return this.props.show ? Counter : <div />;
  }
}
/*
 * Props Type Checking
 */
PageCounter.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  show: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

module.exports = PageCounter;
