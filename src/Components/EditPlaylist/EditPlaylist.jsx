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
          className="playlist-name"
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
      <i className="delete-playlist" onClick={onDelete}></i>
    </li>
  );
};

export default EditPlaylist;
