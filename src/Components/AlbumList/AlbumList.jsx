import React, { useState, useEffect } from "react";

const AlbumList = ({ playlist }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://www.theaudiodb.com/api/v1/json/2/album.php?i=112024"
        );
        const data = await response.json();
        if (data.album) {
          setAlbums(data.album);
        } else {
          setError("No albums found.");
        }
      } catch (err) {
        setError("Failed to fetch albums.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="album-list">
      {albums.map((album) => (
        <div key={album.idAlbum} className="album-card">
          <img
            src={album.strAlbumThumb}
            alt={album.strAlbum}
            className="album-img"
          />
          <div className="album-artist">
            <h2>{album.strAlbum}</h2>
            <p>{album.strArtist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
