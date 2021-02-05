import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import Counter from './Counter';

require('react-table/react-table.css');
require('../../styles/Table.scss');

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page || 0,
      filteredData: this.props.data,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.page !== undefined) {
      this.setState({ filteredData: nextProps.data, page: nextProps.page });
    } else {
      this.setState({ filteredData: nextProps.data });
    }
  }

  render() {
    const {
      onSortedChange,
      showPageCounter,
      removeExtraRows,
      defaultPageSize,
      onPageChange = (page) => this.setState({ page }),
      ...tableProps
    } = this.props;

    const { page, filteredData } = this.state;
    const totalPages = filteredData.length / defaultPageSize;

    return (
      <div className="table-container">
        <div className="card">
          {(filteredData.length > 0)
            && (
              <ReactTable
                {...tableProps}
                page={page}
                resizable={false}
                data={filteredData}
                className="table"
                showPagination={false}
                defaultPageSize={defaultPageSize}
                pageSize={removeExtraRows ? Math.min(defaultPageSize, filteredData.length) : undefined}
                onSortedChange={(props) => {
                  onSortedChange(props);
                  onPageChange(0);
                }}
              />
            )}
        </div>
        {(filteredData.length > 0) && totalPages > 1
          && (
            <Counter
              page={page}
              show={showPageCounter}
              totalPages={totalPages}
              handlePageClick={onPageChange}
              next={() => onPageChange(page + 1)}
              previous={() => onPageChange(page - 1)}
            />
          )}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number, // Page will be controlled internally if page and onPageChange are not provided
  title: PropTypes.string,
  columns: PropTypes.array,
  onPageChange: PropTypes.func,
  onSortedChange: PropTypes.func,
  showPageCounter: PropTypes.bool,
  removeExtraRows: PropTypes.bool,
  defaultPageSize: PropTypes.number,
};

Table.defaultProps = {
  page: undefined,
  data: [],
  title: '',
  columns: [],
  defaultPageSize: 20,
  showPageCounter: true,
  removeExtraRows: false,
  onPageChange: undefined,
  onSortedChange: () => {},
};

module.exports = Table;
