import React from "react";
import "./PlaylistsPopup.css";
import { RxCross1 } from "react-icons/rx";
import AlbumList from "../AlbumList/AlbumList";

const PlaylistPopup = ({ playlist, onClose }) => {
  return (
    <div className="album-container">
      <div className="album-header">
        <h2>Focus</h2>
        <RxCross1
          className="close-popup"
          role="button"
          tabIndex="0"
          onClick={onClose}
        />
      </div>
      <hr />
      <AlbumList playlist={playlist} /> {/* Use AlbumList */}
    </div>
  );
};

export default PlaylistPopup;
