import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IconButton } from '@material-ui/core';

require('../../styles/CollapsibleSections.scss');

class CollapsibleSections extends React.Component {
  constructor() {
    super();

    this.state = {
      showing: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.setState({
        showing: this.props.show,
      });
    }
  }

  UNSAFE_componentWillMount = () => this.setState({ showing: this.props.show });

  toggle = () => this.setState((previousState) => ({ showing: !previousState.showing }));

  render = () => (
    <div className="collapsibleSection">
      <div onClick={() => this.toggle()} className="header pointer">
        {this.props.title}
        {' '}
&nbsp;&nbsp;
        <IconButton>
          {
            this.state.showing === true
              ? <ArrowUpwardIcon />
              : <ArrowDownwardIcon />
          }
        </IconButton>
      </div>
      {this.state.showing ? (
        <div className="content">
          {this.props.children}
        </div>
      ) : null}
    </div>
  )
}

/*
 * Props Type Checking
 */
CollapsibleSections.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  show: PropTypes.bool,
};

CollapsibleSections.defaultProps = {
  children: null,
  title: '',
  show: false,
};

module.exports = CollapsibleSections;
