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
    isResultVisible,
    setIsResultVisible,
  } = useSearch();

  useEffect(() => {
    // FETCH DATA
    if (searchInput) {
      fetchData();
      setIsResultVisible(true); // DISPLAY RESULTS WHEN ACTIVE
    } else {
      setIsResultVisible(false); // HIDE RESULTS
    }
  }, [searchInput, fetchData, setIsResultVisible]);

  const handleChange = (e) => {
    // HANDLE SEARCH INPUT
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
      <div
        className={
          isResultVisible ? "search-results-visible" : "search-results-hidden"
        }
      >
        {/* DISPLAY: ALBUM COVER, SONG & ARTIST */}
        {results.map((result, index) => (
          <div key={index} className="search-items">
            <img className="albumImg" src={result.trackImg} alt="Album cover" />
            <p className="artistItem">{result.artistName} - </p>
            <p className="trackItem">{result.trackName}</p>
            {/* ADD SONG & OPEN MODAL */}
            <p className="empty-space"></p>
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
