import React, { useState, useEffect } from "react";
import { useSearch } from "../Search/SearchContext";
import "./EditPlaylist.css";

// component to display playlists after they are created and update/delete them

const EditPlaylist = ({ playlistId, initialText, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState("");
  const { getPlaylistSongs, removeSongFromPlaylist, playlists } = useSearch();

  useEffect(() => {
    setItemText(playlists[playlistId]?.name || initialText);
  }, [playlists, playlistId, initialText]);

  const toggleEdit = () => {
    // rename playlist
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(playlistId, itemText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toggleEdit();
    }
  };

  const songs = getPlaylistSongs(playlistId);

  const handleRemoveSong = (songIndex) => {
    // delete song from playlist
    removeSongFromPlaylist(playlistId, songIndex);
  };

  return (
    <section className="playlist-container">
      <div className="playlist-item">
        <div className="playlist-header">
          {isEditing ? (
            <input
              type="text"
              className="playlist-rename"
              value={itemText}
              onChange={(e) => setItemText(e.target.value)}
              onBlur={toggleEdit}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <>
              <span className="playlist-name">{itemText}</span>
              <i
                role="button"
                aria-label="Rename playlist"
                className="edit-name"
                onClick={() => setIsEditing(true)}
              ></i>
            </>
          )}
          <i
            role="button"
            aria-label="Delete playlist"
            className="delete-playlist"
            onClick={() => onDelete(playlistId)}
          ></i>
        </div>
        <hr className="playlist-divider" />
        <ul className="song-list">
          {songs.map((song, index) => (
            <li key={index} className="song-display">
              <img src={song.trackImg} alt="Album cover" />
              <span className="song-info">
                {song.trackName} - {song.artistName}
              </span>
              <i
                onClick={() => handleRemoveSong(index)}
                className="remove-song"
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EditPlaylist;
