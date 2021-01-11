/*
 * External Dependencies
 */

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const hardcodedOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const Dropdown = ({
        isMulti,
        options,
        defaultValues,
        name,
        className,
        showAnimations,
        isClearable,
        isSearchable,
        placeholder,
        onChange,
        value,
    }) => (
            <Select
                value={value}
                defaultValue={defaultValues}
                isMulti={isMulti}
                name={name}
                options={options}
                className={className}
                components={showAnimations ? animatedComponents : null}
                isClearable={isClearable}
                isSearchable={isSearchable}
                placeholder={placeholder}
                onChange={onChange}
            />
        );


module.exports = Dropdown;

/*
 * Props Type Checking
 */
Dropdown.propTypes = {
    options: PropTypes.array,
    defaultValues: PropTypes.array,
    name: PropTypes.string,
    isMulti: PropTypes.bool,
    className: PropTypes.string,
    showAnimations: PropTypes.bool,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    defaultValues: [hardcodedOptions[2], hardcodedOptions[3]],
    isMulti: false,
    name: 'select',
    options: hardcodedOptions,
    className: 'react-select',
    showAnimations: false,
    isClearable: false,
    isSearchable: true,
    placeholder: 'Search...',
    onChange: () => null,
};
