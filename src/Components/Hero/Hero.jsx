import React from "react";
import music from '../../Images/music.png';
import "./Hero.css";

const Hero = () => {
  return (
    <div className="homeContainer">
      <div className="homeSection alignBottom underlinedSection">
          <img src={music} alt="" width={"300px"} height={"300px"} />
        <div id="homeSection1-content" >
          <h1 className="h1">WHAT’S YOUR <span className="focus">MOOD</span> TODAY?</h1>
          <p className="description">Collect music playlists for different moments in your everyday life!</p>
        </div>
      </div>
    </div>
  )
};

export default Hero;
