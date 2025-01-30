import "./Search.css";
import React, { useState, useEffect, useCallback } from "react";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = 523532;

  const fetchData = useCallback(async () => {
    const [artistName, trackName] = searchInput
      .split("-")
      .map((item) => item.trim());
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/${API_KEY}/searchtrack.php?s=${encodeURIComponent(
          artistName
        )}&t=${encodeURIComponent(trackName)}`
      );
      const data = await response.json();
      if (data.track) {
        setResults(
          data.track.map((item) => ({
            trackName: item.strTrack,
            artistName: item.strArtist,
          }))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [searchInput, fetchData]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData(searchInput);
    }
  };

  return (
    <div className="search-section">
      <input
        className="search-input"
        type="text"
        placeholder="    Search"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchInput}
      />
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="search-items">
            {/* INSERT MOODZ LOGO */}
            <h4 className="trackItem">{result.trackName}</h4>
            <p className="artistItem">{result.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
