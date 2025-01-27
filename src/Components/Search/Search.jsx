// import React from "react";
import "./Search.css";
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState ([]);

  useEffect(() => {
    if (searchInput) {
      fetchData(searchInput);
    } else {
      setResults([]);
    }
  }, [searchInput]);

  const fetchData = async (query) => {
    try {
      const response = await
      fetch(`"https://theaudiodb.com/api/v1/json/2/album.php?"${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchSection">
      <input className="searchInput"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
      />
      <div className="search-results">
        {results.map((album) => (
          <>
          <li key={album.idAlbum}>{album.strAlbumThumb}</li>
          <li key={album.idAlbum}>{album.strTrack}</li>
          <li key={album.idAlbum}>{album.strArtist}</li>
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
