import React from 'react';
import PropTypes from 'prop-types';

require('../../styles/CollapsibleSections.css');

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

  componentWillMount = () => this.setState({ showing: this.props.show });

  toggle = () => this.setState({ showing: !this.state.showing });


  render = () => {
    return (
      <div className="collapsibleSection pointer">
        <div onClick={()=>this.toggle()} className='header'>
            {this.props.title}</div>
        {this.state.showing ? (
            <div className='content'>
            {this.props.children}
            </div>
            ) : null}
    </div>
    );
  }
}

/*
 * Props Type Checking
 */
CollapsibleSections.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

CollapsibleSections.defaultProps = {
  children: null,
  title: '',
};

module.exports = CollapsibleSections;
