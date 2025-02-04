import React, { useState, useCallback } from "react";
import { useSearch } from "../Search/SearchContext";
import ModalDOM from "./ModalDOM";
import EditPlaylist from "../EditPlaylist/EditPlaylist";
import "./SongModal.css";

function SongModal() {
  const {
    isModalOpen,
    closeModal,
    selectedSong,
    existingPlaylists,
    updatePlaylist,
    deletePlaylist,
    addNewPlaylist,
    addSongToPlaylist,
    playlist,
  } = useSearch();

  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleSaveToPlaylist = () => {
    if (selectedSong && selectedPlaylist) {
      addSongToPlaylist(selectedPlaylist, selectedSong);
      closeModal();
    }
  };

  const [newPlaylistInput, setNewPlaylistInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleNewPlaylistInput = () => {
    setNewPlaylistInput(!newPlaylistInput);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCloseModal = useCallback(() => {
    if (inputValue.trim() !== "") {
      addNewPlaylist(inputValue);
    }
    closeModal();
    setNewPlaylistInput(false);
    setInputValue("");
  }, [inputValue, addNewPlaylist, closeModal]);

  return (
    <>
      <ModalDOM isOpen={isModalOpen} onClose={handleCloseModal}>
        <p>Add to existing playlist</p>
        <hr />
        {existingPlaylists.map((playlist, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`playlist-${index}`}
              name="playlistOption"
              value={playlist}
              onChange={() => setSelectedPlaylist(playlist)}
            />
            <label htmlFor={`playlist-${index}`}>{playlist}</label>
          </div>
        ))}
        <button onClick={toggleNewPlaylistInput}>NEW PLAYLIST</button>
        {newPlaylistInput && (
          <div className="new-playlist">
            <input
              type="text"
              className="playlist-placeholder"
              placeholder="What's your mood?"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveToPlaylist}>SAVE TO PLAYLIST</button>
          </div>
        )}
      </ModalDOM>
      <div>
        <ul>
          {existingPlaylists.map((playlist, index) => (
            <EditPlaylist
              key={`${playlist}-${index}`}
              initialText={playlist}
              onUpdate={(newText) => updatePlaylist(index, newText)}
              onDelete={() => deletePlaylist(index)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default SongModal;
