import React from "react";
import { useEffect, useState } from "react";

const DisplayPlayList = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    strTrack: "",
    strAlbum: "",
    intDuration: "",
  });

  const addTrackLocally = (newTrack) => {
    setTracks((prevTracks) => [
      ...prevTracks,
      { ...newTrack, idTrack: Date.now() }, // Use Date.now() as a unique ID for local additions
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { strTrack, strAlbum, intDuration } = formData;
    if (strTrack && strAlbum && intDuration) {
      addTrackLocally({
        strTrack,
        strAlbum,
        intDuration: parseInt(intDuration, 10),
      });
      setFormData({ strTrack: "", strAlbum: "", intDuration: "" }); // Reset the form
      setFormVisible(false); // Hide the form after submission
    }
  };

  useEffect(() => {
    // Fetch tracks from the API
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "https://www.theaudiodb.com/api/v1/json/2/track.php?m=2115886"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTracks(data.track || []); // Set tracks or empty array if none found
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
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        {formVisible ? "Hide Form" : "Add New Track"}
      </button>
      {formVisible && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Track Name
            </label>
            <input
              type="text"
              name="strTrack"
              value={formData.strTrack}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Album Name
            </label>
            <input
              type="text"
              name="strAlbum"
              value={formData.strAlbum}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (ms)
            </label>
            <input
              type="number"
              name="intDuration"
              value={formData.intDuration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Track
          </button>
        </form>
      )}
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
