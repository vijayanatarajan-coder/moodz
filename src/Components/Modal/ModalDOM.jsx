import React from "react";
import ReactDOM from "react-dom";
import "./SongModal.css";

const ModalDOM = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>DONE</button>
      </div>
    </div>,
    document.body
  );
};

export default ModalDOM;
