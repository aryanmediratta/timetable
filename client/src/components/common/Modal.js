import React from 'react';

require('../../styles/Modal.scss');

const Modal = (props) => {
  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  return (
    <div
      className="modal"
      onClick={closeModal}
      style={divStyle}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="close"
          onClick={closeModal}
        >
          &times;
        </span>
        <br />
        {props.body}
      </div>
    </div>
  );
};

export default Modal;
