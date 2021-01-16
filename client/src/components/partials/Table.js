/* External Dependencies */
import React from 'react';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const PageCounter = require('./PageCounter');

require('react-table/react-table.css');
require('../../styles/Table.scss');

class Table extends React.Component {
  state = {
    filterTerm: '',
    page: this.props.page || 0,
    filteredData: this.props.data,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== undefined) {
      this.setState({ filteredData: nextProps.data, page: nextProps.page });
    } else {
      this.setState({ filteredData: nextProps.data });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filterTerm === prevState.filterTerm && this.props.data !== prevProps.data) {
      this.filterData(this.state.filterTerm);
    }
  }

  filterData(term) {
    const { data, customFilterFunc } = this.props;

    if (!term) {
      this.setState({ filterTerm: '', filteredData: data });
      return;
    }

    if (customFilterFunc) {
      this.setState({ filterTerm: term, filteredData: customFilterFunc(term, data) });
    } else {
      const options = {
        location: 0,
        distance: 10,
        threshold: 0.1,
        tokenize: true,
        matchAllTokens: true,
        maxpatternlength: 32,
        minmatchcharlength: 1,
        keys: Object.keys(data[0]),
      };

      const fuse = new Fuse(data, options);
      this.setState({ filterTerm: term, filteredData: fuse.search(term) });
    }
  }

  render() {
    const {
      title,
      rowcount,
      searchable,
      emptyState,
      selectTable,
      onSortedChange,
      showPageCounter,
      removeExtraRows,
      defaultPageSize,
      selectTableProps,
      filterPlaceholder,
      RowCountComponent,
      additionalHeaderContentLeft,
      additionalHeaderContentRight,
      onPageChange = page => this.setState({ page }),
      ...tableProps
    } = this.props;

    const { page, filteredData } = this.state;
    const totalPages = filteredData.length / defaultPageSize;

    return (
      <div className="ef-table-container">
        <div className="ef-table-card" >
          <div className="ef-table-header">
            {
              (title || additionalHeaderContentLeft) &&
              <div className="ef-table-header-left">
                {
                  title &&
                  <h3 className="ef-table-title">
                    { title }
                  </h3>
                }
                { additionalHeaderContentLeft && additionalHeaderContentLeft }
              </div>
            }
            <div className="ef-table-header-right">
              {
                searchable &&
                <TextInput
                  className="ef-table-filter"
                  inputRef={this.props.searchRef}
                  onChange={(term) => {
                    this.filterData(term);
                    onPageChange(0);
                  }}
                  placeholderText={filterPlaceholder}
                  value={this.state.filterTerm}
                />
              }
              { additionalHeaderContentRight && additionalHeaderContentRight }
              { RowCountComponent && <RowCountComponent count={rowcount || filteredData.length} /> }
            </div>
          </div>
          {(filteredData.length === 0 && emptyState) && emptyState}
          {(filteredData.length > 0 || !emptyState) &&
            <ReactTable
              {...tableProps}
              {...selectTableProps}
              page={page}
              resizable={false}
              data={filteredData}
              className="ef-table"
              showPagination={false}
              defaultPageSize={defaultPageSize}
              pageSize={removeExtraRows ? Math.min(defaultPageSize, filteredData.length) : undefined}
              onSortedChange={(props) => {
                onSortedChange(props);
                onPageChange(0);
              }}
            />
          }
        </div>
        {(filteredData.length > 0 || !emptyState) && totalPages > 1 &&
          <PageCounter
            page={page}
            show={showPageCounter}
            totalPages={totalPages}
            handlePageClick={onPageChange}
            next={() => onPageChange(page + 1)}
            previous={() => onPageChange(page - 1)}
          />
        }
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number, // Page will be controlled internally if page and onPageChange are not provided
  loading: PropTypes.bool,
  title: PropTypes.string,
  sortable: PropTypes.bool,
  columns: PropTypes.array,
  searchable: PropTypes.bool,
  emptyState: PropTypes.node,
  getTrProps: PropTypes.func,
  selectTable: PropTypes.bool,
  noDataText: PropTypes.string,
  onPageChange: PropTypes.func,
  defaultSorted: PropTypes.array,
  onSortedChange: PropTypes.func,
  showPageCounter: PropTypes.bool,
  removeExtraRows: PropTypes.bool,
  customFilterFunc: PropTypes.func,
  defaultPageSize: PropTypes.number,
  RowCountComponent: PropTypes.func,
  filterPlaceholder: PropTypes.string,
  additionalHeaderContentLeft: PropTypes.node,
  additionalHeaderContentRight: PropTypes.node,
  selectTableProps: PropTypes.exact({
    keyField: PropTypes.string,
    selectAll: PropTypes.bool,
    toggleAll: PropTypes.func,
    isSelected: PropTypes.func,
    selectType: PropTypes.string,
    toggleSelection: PropTypes.func,
    SelectInputComponent: PropTypes.node,
    SelectAllInputComponent: PropTypes.node,
  }),
};

Table.defaultProps = {
  page: undefined,
  data: [],
  title: '',
  columns: [],
  loading: false,
  sortable: false,
  emptyState: null,
  defaultSorted: [],
  searchable: false,
  selectTable: false,
  defaultPageSize: 20,
  showPageCounter: true,
  removeExtraRows: false,
  customFilterFunc: null,
  getTrProps: () => ({}),
  RowCountComponent: null,
  onPageChange: undefined,
  onSortedChange: () => {},
  additionalHeaderContentLeft: null,
  additionalHeaderContentRight: null,
  // filterPlaceholder: i18nUtils.gettext('Search'),
  // noDataText: i18nUtils.gettext('No data available.'),
  selectTableProps: {
    keyField: 'id',
    selectAll: false,
    selectType: 'checkox',
    SelectInputComponent: null,
    SelectAllInputComponent: null,
  },
};

module.exports = Table;
