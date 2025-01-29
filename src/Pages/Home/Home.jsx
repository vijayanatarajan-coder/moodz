import React from "react";
import music from '../../Images/music 1.png';
import resting from '../../Images/resting 1.png';
import working from '../../Images/working 1.png';
import passenger from '../../Images/passenger 1.png';
import Button from "../../Components/Button/Button";
import "./Home.css";
const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeSection alignBottom underlinedSection">
          <img src={music} alt="" width={"300px"} height={"300px"} />
        <div id="homeSection1-content" >
          <h1 className="h1">WHAT’S YOUR <span className="focus">MOOD</span> TODAY?</h1>
          <p className="description">Collect music playlists for different moments in your everyday life!</p>
        </div>
      </div>
      {/* Section 2 */}
      <div className="homeSection alignTop">
        <h2 className="h2 centerText">For when you really<br/>need to <span className="focus">focus...</span></h2>
        <img src={working} alt="" width={"250px"} height={"250px"} />
      </div>
      {/* Section 3 */}
      <div className="homeSection alignCenter">
        <img src={passenger} alt="" width={"250px"} height={"250px"} />
        <h2 className="h2 centerText">...or when you are <br/><span className="focus">on the go...</span></h2>
      </div>
      {/* Section 4 */}
      <div className="homeSection alignBottom">
        <h2 style={{paddingBottom:"5%"}} className="h2 centerText">...or when you just<br/>want to <span className="focus">relax</span></h2>
        <img src={resting} alt="" width={"250px"} height={"250px"} />
      </div>
      {/* buttons */}
      <div className="alignCenter">
        <h2 className="h2 centerText">Check out our curated playlists<br/>or put together your own!</h2>
        <div id="buttonsContainer">
          <Button text="Discover" to="/Discover" />
          <Button text="Create" to="/Create" />
        </div>
      </div>
    </div>
  );
}



export default Home;