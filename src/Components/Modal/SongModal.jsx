import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../Search/SearchContext";
import ModalDOM from "./ModalDOM";
import EditPlaylist from "../EditPlaylist/EditPlaylist";
import "./SongModal.css";

// component including all the song modal functionality, for both existing and new playlists

function SongModal() {
  // functions from search context
  const {
    isModalOpen,
    closeModal,
    selectedSong,
    existingPlaylists,
    updatePlaylist,
    deletePlaylist,
    addNewPlaylist,
    addSongToPlaylist,
    clearSearchResults,
  } = useSearch();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [newPlaylistInput, setNewPlaylistInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // add blur to background when modal is triggered
    const mainContent = document.getElementById("main-content");
    if (isModalOpen) {
      mainContent.classList.add("blur-background");
    } else {
      mainContent.classList.remove("blur-background");
    }
  }, [isModalOpen]);

  const toggleNewPlaylistInput = () => {
    setNewPlaylistInput(!newPlaylistInput);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCloseModal = useCallback(() => {
    // functionality to handle song being saved to either an existing playlist or a new one that is created
    const handleSaveToPlaylist = () => {
      if (selectedSong && selectedPlaylist) {
        addSongToPlaylist(selectedPlaylist.id, selectedSong);
        closeModal();
      }
    };

    const handleCreateNewPlaylist = () => {
      if (inputValue.trim() !== "" && selectedSong) {
        addNewPlaylist(inputValue.trim(), selectedSong);
      }
    };

    if (newPlaylistInput && inputValue.trim() !== "") {
      handleCreateNewPlaylist();
    } else if (selectedPlaylist) {
      handleSaveToPlaylist();
    }
    closeModal();
    clearSearchResults();
    setNewPlaylistInput(false);
    setInputValue("");
    setSelectedPlaylist("");
  }, [
    selectedSong,
    selectedPlaylist,
    inputValue,
    newPlaylistInput,
    addSongToPlaylist,
    addNewPlaylist,
    closeModal,
    clearSearchResults,
    setNewPlaylistInput,
    setInputValue,
    setSelectedPlaylist,
  ]);

  return (
    <>
      <ModalDOM isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="existing-playlist">Add to existing playlist</p>
        <hr className="existing-playlist-divider" />
        {existingPlaylists.map((playlist, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`playlist-${index}`}
              className="playlist-option"
              value={playlist.id}
              onChange={() => setSelectedPlaylist(playlist)}
              checked={selectedPlaylist === playlist}
            />
            <label className="playlist-option" htmlFor={`playlist-${index}`}>
              {playlist.name}
            </label>
          </div>
        ))}
        <button className="playlist-btn" onClick={toggleNewPlaylistInput}>
          NEW PLAYLIST
        </button>
        {newPlaylistInput && (
          <div className="new-playlist">
            <input
              type="text"
              className="playlist-placeholder"
              placeholder="What's your mood?"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button className="playlist-btn" onClick={handleCloseModal}>
          SAVE TO PLAYLIST
        </button>
      </ModalDOM>
      <div>
        <ul>
          {existingPlaylists.map((playlist) => (
            <EditPlaylist
              key={playlist.id}
              playlistId={playlist.id}
              initialText={playlist.name}
              onUpdate={(id, newName) => updatePlaylist(id, newName)}
              onDelete={(id) => deletePlaylist(id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default SongModal;
