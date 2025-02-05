import React from "react";
import ReactDOM from "react-dom";
import "./SongModal.css";

// component to render modal on the DOM to be able to add a song to a playlist

const ModalDOM = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalDOM;
