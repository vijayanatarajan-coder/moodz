// import React, { useState, useEffect, useCallback } from "react";
// import ModalDOM from "./ModalDOM";
// import EditPlaylist from "../EditPlaylist/EditPlaylist";
// import "./SongModal.css";
// import SearchBar from "../Search/Search";

// const SongModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPlaylistInput, setNewPlaylistInput] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [existingPlaylists, setExistingPlaylists] = useState([]);

//   useEffect(() => {
//     const storedPlaylists =
//       JSON.parse(localStorage.getItem("existingPlaylists")) || [];
//     setExistingPlaylists(storedPlaylists);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(
//       "existingPlaylists",
//       JSON.stringify(existingPlaylists)
//     );
//   }, [existingPlaylists]);

//   const openModal = useCallback((songData) => {
//     setIsModalOpen(true);
//     console.log("Song data:", songData);
//   }, []);

//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//     setNewPlaylistInput(false);
//     if (inputValue.trim() !== "") {
//       setExistingPlaylists((prev) => {
//         const updatedPlaylists = [...prev, inputValue];

//         localStorage.setItem(
//           "existingPlaylists",
//           JSON.stringify(updatedPlaylists)
//         );
//         return updatedPlaylists;
//       });
//     }
//     setInputValue("");
//   }, [inputValue]);

//   const toggleNewPlaylistInput = () => {
//     setNewPlaylistInput(!newPlaylistInput);
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const updatePlaylist = useCallback((index, newText) => {
//     setExistingPlaylists((prev) => {
//       const updatedPlaylists = prev.map((item, i) =>
//         i === index ? newText : item
//       );
//       localStorage.setItem(
//         "existingPlaylists",
//         JSON.stringify(updatedPlaylists)
//       );
//       return updatedPlaylists;
//     });
//   }, []);

//   const deletePlaylist = useCallback((index) => {
//     setExistingPlaylists((prev) => prev.filter((_, i) => i !== index));
//   }, []);

//   return (
//     <div className={`app ${isModalOpen ? "blurred" : ""}`}>
//       <SearchBar openModal={openModal} />
//       <ModalDOM isOpen={isModalOpen} onClose={closeModal}>
//         <p>Add to existing playlist</p>
//         <hr />
//         {existingPlaylists.map((playlist, index) => (
//           <div key={index}>
//             <input
//               type="radio"
//               id={`playlist-${index}`}
//               name="playlistOption"
//               value={playlist}
//             />
//             <label htmlFor={`playlist-${index}`}>{playlist}</label>
//           </div>
//         ))}
//         <button onClick={toggleNewPlaylistInput}>NEW PLAYLIST</button>
//         {newPlaylistInput && (
//           <div className="new-playlist">
//             <input
//               type="text"
//               className="playlist-placeholder"
//               placeholder="What's your mood?"
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//           </div>
//         )}
//       </ModalDOM>
//       <div>
//         <ul>
//           {existingPlaylists.map((playlist, index) => (
//             <EditPlaylist
//               key={`${playlist}-${index}`}
//               initialText={playlist}
//               onUpdate={(newText) => updatePlaylist(index, newText)}
//               onDelete={() => deletePlaylist(index)}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SongModal;

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
      closeModal(); //NEW
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
