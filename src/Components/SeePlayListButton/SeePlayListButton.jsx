import React from "react";
import "./SeePlayListButton.css";

const SeePlayListButton = ({ onClick }) => {
  return (
    <button
      className="playlist-button"
      onClick={onClick}
      aria-label="View the playlist"
      type="button"
    >
      SEE PLAYLIST
    </button>
  );
};

export default SeePlayListButton;
