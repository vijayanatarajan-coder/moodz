import React from "react";
import "./PlaylistsPopup.css";
import { RxCross1 } from "react-icons/rx";
import AlbumList from "../AlbumList/AlbumList";

const PlaylistPopup = ({ playlist, onClose }) => {
  return (
    <section
      className="album-container"
      aria-labelledby="popup-title"
      aria-describedby="popup-playlist"
      tabIndex="-1"
    >
      <div className="album-header">
        <h2>{playlist}</h2>
        <RxCross1
          className="close-popup"
          role="button"
          tabIndex="0"
          onClick={onClose}
        />
      </div>
      <AlbumList playlist={playlist} />
    </section>
  );
};

export default PlaylistPopup;
