import "./Search.css";
import React, { useEffect } from "react";
import { useSearch } from "./SearchContext";

function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    results,
    fetchData,
    openModal,
    showSearchResults,
  } = useSearch();

  useEffect(() => {
    if (searchInput) {
      fetchData();
      // } else {
      //   setResults([]);
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
      <p className="search-prompt">SEARCH: artist - song</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search: artist - song"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchInput}
      />
      {showSearchResults && (
        <div className="search-results">
          {results.map((result, index) => (
            <div key={index} className="search-items">
              <img
                src={result.trackImg}
                style={{ width: "70px", height: "70px", margin: "4px" }}
                alt="Album cover"
              />
              <h4 className="trackItem">{result.trackName} </h4>
              <p className="artistItem">{result.artistName}</p>
              <i
                // key={index}
                role="button"
                className="plus-button"
                aria-label="Add Song"
                onClick={() => openModal(result)}
              ></i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
