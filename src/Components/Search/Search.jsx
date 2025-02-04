import "./Search.css";
import React, { useEffect } from "react";
import { useSearch } from "./SearchContext";

function SearchBar() {
  const { searchInput, setSearchInput, results, fetchData, openModal } =
    useSearch();

  useEffect(() => {
    if (searchInput) {
      fetchData();
    }
  }, [searchInput, fetchData]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-section">
      <p className="search-prompt">SEARCH: artist - song</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search: artist - song"
        onChange={handleChange}
        value={searchInput}
      />
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="search-items">
            <img
              className="albumImg"
              src={result.trackImg}
              style={{ width: "70px", height: "70px", margin: "4px" }}
              alt="Album cover"
            />
            <p className="trackItem">{result.trackName} - </p>
            <p className="artistItem">{result.artistName}</p>
            <i
              key={index}
              role="button"
              className="plus-button"
              aria-label="Add Song"
              onClick={() => openModal(result)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
