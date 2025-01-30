import React from "react";
import "./SeePlayListButton.css";

const SeePlayListButton = ({ onClick }) => {
  return (
    <button className="playlist-button" onClick={onClick}>
      SEE PLAYLIST
    </button>
  );
};

export default SeePlayListButton;
