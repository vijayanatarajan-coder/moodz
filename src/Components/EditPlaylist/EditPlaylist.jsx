import React, { useState } from "react";
import { useSearch } from "../Search/SearchContext";

const EditPlaylist = ({ initialText, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState(initialText);
  const { getPlaylistSongs } = useSearch();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(itemText);
    }
  };

  const songs = getPlaylistSongs(initialText);

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
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.trackName} - {song.artistName}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default EditPlaylist;
