import React, { useState, useEffect, useRef } from "react";
import "./AlbumList.css";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const albumListRef = useRef(null);

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
      <div className="loading-container" role="status" aria-live="polite">
        <p>Loading albums...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Accessible Album List */}
      <section
        ref={albumListRef}
        id="albums"
        className="album-list"
        aria-labelledby="album-section-title"
      >
        <ul>
          {albums.map((album) => (
            <li
              key={album.idAlbum}
              className="album-card"
              tabIndex="0" // Makes each album focusable with keyboard
              aria-label={`Album: ${album.strAlbum} by ${album.strArtist}`}
            >
              <img
                src={album.strAlbumThumb}
                alt={`${album.strAlbum} album cover`}
                className="album-img"
                loading="lazy"
              />
              <div className="album-artist">
                <h2>{album.strAlbum}</h2>
                <p>{album.strArtist}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AlbumList;
