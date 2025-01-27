import React, { useEffect, useState } from "react";

const DisplayPlayList = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "https://www.theaudiodb.com/api/v1/json/2/track.php?m=2115886"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTracks(data.track || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Track List</h1>
      {tracks.length === 0 ? (
        <p className="text-center">No tracks available.</p>
      ) : (
        <ul className="space-y-4">
          {tracks.map((track) => (
            <li
              key={track.idTrack}
              className="p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <h2 className="text-lg font-semibold">{track.strTrack}</h2>
              <p className="text-gray-600">Album: {track.strAlbum}</p>
              <p className="text-gray-600">
                Duration:{" "}
                {track.intDuration
                  ? `${Math.floor(track.intDuration / 60000)}:${
                      (track.intDuration % 60000) / 1000
                    }`
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayPlayList;
