import React, { useState } from "react";
import "./DisplayPlayList.css";
import PlaylistCardFront from "../PlayListCardFront/PlayListCardFront";
import PlaylistPopup from "../PlaylistPopup/PlaylistPopup";
import onTheGoImg from "../../Images/bus-stop.png";
import workoutImg from "../../Images/dumbbell.png";
import relaxImg from "../../Images/coconut-tree.png";

const playlists = [
  { name: "ON THE GO", image: onTheGoImg },
  { name: "WORKOUT", image: workoutImg },
  { name: "RELAX", image: relaxImg },
  { name: "PARTY", image: relaxImg },
];

const DisplayPlayList = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleClosePopup = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="container">
      {playlists.map((playlist, index) => (
        <div className="playlist-card-container" key={index}>
          <PlaylistCardFront
            title={playlist.name}
            image={playlist.image}
            onButtonClick={() => setSelectedPlaylist(playlist.name)}
          />
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
