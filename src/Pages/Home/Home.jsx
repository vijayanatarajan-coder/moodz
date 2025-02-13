import React from "react";
import Button from "../../Components/Button/Button";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import Mood from "../../Components/MoodExample/Mood";
const Home = () => {
  return (
    <div className="homeContainer">
      <Hero />
      {/* Section 2 */}
      <Mood />
      {/* buttons */}
      <div className="alignCenter">
        <h2 className="h2 centerText">
          Check out our curated playlists
          <br />
          or put together your own!
        </h2>
        <div id="buttonsContainer">
          <Button text="Discover" to="/Discover" />
          <Button text="Create" to="/MyPlayLists" />
        </div>
      </div>
    </div>
  );
};

export default Home;
