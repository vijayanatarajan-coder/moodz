import React, { useState, useEffect } from "react";
import ModalExistingPlaylist from "./ModalDOM";
import EditablePlaylist from "../EditPlaylist/EditPlaylist";
import "./SongModal.css";

const SongModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistInput, setNewPlaylistInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [existingPlaylists, setExistingPlaylists] = useState([]);

  useEffect(() => {
    const storedPlaylists =
      JSON.parse(localStorage.getItem("existingPlaylists")) || [];
    setExistingPlaylists(storedPlaylists);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPlaylistInput(false);
    if (inputValue.trim() !== "") {
      const updatedPlaylists = [...existingPlaylists, inputValue];
      setExistingPlaylists(updatedPlaylists);
      localStorage.setItem(
        "existingPlaylists",
        JSON.stringify(updatedPlaylists)
      );
    }
    setInputValue("");
  };

  const toggleNewPlaylistInput = () => {
    setNewPlaylistInput(!newPlaylistInput);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updatePlaylist = (index, newText) => {
    const updatedPlaylists = [...existingPlaylists];
    updatedPlaylists[index] = newText;
    setExistingPlaylists(updatedPlaylists);
  };

  const deletePlaylist = (index) => {
    const updatedPlaylists = existingPlaylists.filter((_, i) => i !== index);
    setExistingPlaylists(updatedPlaylists);
    localStorage.setItem("existingPlaylists", JSON.stringify(updatedPlaylists));
  };

  return (
    <div className={`app ${isModalOpen ? "blurred" : ""}`}>
      <button onClick={openModal}>+</button>
      <ModalExistingPlaylist isOpen={isModalOpen} onClose={closeModal}>
        <p>Add to existing playlist</p>
        <hr />
        {existingPlaylists.map((playlist, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`playlist-${index}`}
              name="playlistOption"
              value={playlist}
            />
            <label htmlFor={`playlist-${index}`}>{playlist}</label>
          </div>
        ))}
        <button onClick={toggleNewPlaylistInput}>NEW PLAYLIST</button>
        {newPlaylistInput && (
          <div className="new-playlist">
            <input
              type="text"
              placeholder="What's your mood?"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        )}
      </ModalExistingPlaylist>
      <div>
        <ul>
          {existingPlaylists.map((playlist, index) => (
            <EditablePlaylist
              key={index}
              index={index}
              initialText={playlist}
              onUpdate={(newText) => updatePlaylist(index, newText)}
              onDelete={() => deletePlaylist(index)}
            />
            // <li key={index}>
            //   {playlist}
            //   <i className="edit-name"></i>
            //   <button onClick={() => deletePlaylist(index)} className="delete">
            //     <img
            //       src={require("../../Images/pink bin.png")}
            //       alt="trash bin"
            //     />
            //   </button>
            // </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongModal;
