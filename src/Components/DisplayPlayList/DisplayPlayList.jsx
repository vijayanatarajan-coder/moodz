import React, { useState } from "react";
import "./DisplayPlayList.css";
import PlaylistCardFront from "../PlayListCardFront/PlayListCardFront";
import PlaylistPopup from "../PlaylistPopup/PlaylistPopup";
import onTheGoImg from "../../Images/bus-stop.png";
import workoutImg from "../../Images/dumbbell.png";
import relaxImg from "../../Images/coconut-tree.png";
import partyImg from "../../Images/dance.png";

const playlists = [
  { name: "ON THE GO", image: onTheGoImg },
  { name: "WORKOUT", image: workoutImg },
  { name: "RELAX", image: relaxImg },
  { name: "PARTY", image: partyImg },
];

const DisplayPlayList = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Function to close the popup by resetting the selected playlist
  const handleClosePopup = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="container">
      {/* Mapping over the playlists array to render each playlist card */}
      {playlists.map((playlist, index) => (
        <div className="playlist-card-container" key={index}>
          {/* Displaying the front card of the playlist */}
          <PlaylistCardFront
            title={playlist.name}
            image={playlist.image}
            onButtonClick={() => setSelectedPlaylist(playlist.name)}
          />
          {/* Conditionally rendering the popup only if the corresponding playlist is selected */}
          {selectedPlaylist === playlist.name && (
            <PlaylistPopup
              playlist={playlist.name}
              onClose={handleClosePopup}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default DisplayPlayList;
