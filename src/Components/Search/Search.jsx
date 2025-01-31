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
            trackImg: item.strTrackThumb,
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

  const handleClick = (e) => {
    // onClick = INSERT MODAL FROM SERGIO
  };

  return (
    <div className="search-section">
      <input
        className="search-input"
        type="text"
        placeholder="Search: artist - song"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchInput}
      />
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="search-items">
            <img
              src={result.trackImg}
              style={{ width: "70px", height: "70px", margin: "4px" }}
            />
            <h4 className="trackItem">
              {result.trackName}{" "}
              <img
                src="/Plus.png"
                alt="add to playlist"
                onClick={() => handleClick()}
                style={{ cursor: "pointer" }}
              />
            </h4>
            <p className="artistItem">{result.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
