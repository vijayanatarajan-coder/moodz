import React from "react";
import "./PlayListCardFront.css";
import SeePlayListButton from "../SeePlayListButton/SeePlayListButton";

const PlaylistCardFront = ({ title, image, onButtonClick }) => {
  return (
    <section className="playlist-card" aria-labelledby="playlist-title">
      <h2>{title}</h2>
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <SeePlayListButton
        onClick={onButtonClick}
        aria-label={`See playlist titled ${title}`}
      />
    </section>
  );
};

export default PlaylistCardFront;
