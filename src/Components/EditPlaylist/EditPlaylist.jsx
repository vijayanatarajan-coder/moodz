import React, { useState } from "react";

const EditPlaylist = ({ initialText, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState(initialText);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(itemText);
    }
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          onBlur={toggleEdit}
        />
      ) : (
        <>
          <span>{itemText}</span>
          <i className="edit-name" onClick={toggleEdit}></i>
        </>
      )}
      <button onClick={(index) => onDelete(index)} className="delete">
        <img src={require("../../Images/pink bin.png")} alt="trash bin" />
      </button>
    </li>
  );
};

export default EditPlaylist;
