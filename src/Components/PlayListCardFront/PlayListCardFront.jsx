import React from "react";
import "./PlayListCardFront.css";
import SeePlayListButton from "../SeePlayListButton/SeePlayListButton";

const PlaylistCardFront = ({ title, image, onButtonClick }) => {
  return (
    <div className="playlist-card">
      <h2>{title}</h2>
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <SeePlayListButton onClick={onButtonClick} />
    </div>
  );
};

export default PlaylistCardFront;
