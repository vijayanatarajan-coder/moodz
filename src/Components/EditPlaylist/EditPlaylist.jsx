import React, { useState } from "react";
import { useSearch } from "../Search/SearchContext";

const EditPlaylist = ({ initialText, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState(initialText);
  const { getPlaylistSongs, removeSongFromPlaylist } = useSearch();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(itemText);
    }
  };

  const songs = getPlaylistSongs(initialText);

  const handleRemoveSong = (songIndex) => {
    removeSongFromPlaylist(initialText, songIndex);
  };

  return (
    <div>
      <div className="playlist-display">
        <ul className="playlist-name">
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
            <i className="delete-playlist" onClick={onDelete}></i>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          {songs.map((song, index) => (
            <li key={index} className="song-display">
              <img
                src={song.trackImg}
                style={{ width: "50px", height: "50px", margin: "4px" }}
                alt="Album cover"
              />
              {song.trackName} - {song.artistName}
              <i
                onClick={() => handleRemoveSong(index)}
                className="remove-song"
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditPlaylist;
