// import "./Search.css";
// import React, { useState, useEffect, useCallback } from "react";

// const SearchBar = ({ openModal }) => {
//   const [searchInput, setSearchInput] = useState("");
//   const [results, setResults] = useState([]);
//   const API_KEY = 523532;

//   const fetchData = useCallback(async () => {
//     const [artistName, trackName] = searchInput
//       .split("-")
//       .map((item) => item.trim());
//     try {
//       const response = await fetch(
//         `https://www.theaudiodb.com/api/v1/json/${API_KEY}/searchtrack.php?s=${encodeURIComponent(
//           artistName
//         )}&t=${encodeURIComponent(trackName)}`
//       );
//       const data = await response.json();
//       if (data.track) {
//         setResults(
//           data.track.map((item) => ({
//             trackImg: item.strTrackThumb,
//             trackName: item.strTrack,
//             artistName: item.strArtist,
//           }))
//         );
//       } else {
//         setResults([]);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setResults([]);
//     }
//   }, [searchInput]);

//   useEffect(() => {
//     if (searchInput) {
//       fetchData();
//     } else {
//       setResults([]);
//     }
//   }, [searchInput, fetchData]);

//   const handleChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchData(searchInput);
//     }
//   };

//   return (
//     <div className="search-section">
//       <p className="search-prompt">SEARCH: artist - song</p>
//       <input
//         className="search-input"
//         type="text"
//         placeholder="Search: artist - song"
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         value={searchInput}
//       />
//       <div className="search-results">
//         {results.map((result, index) => (
//           <div key={index} className="search-items">
//             <img
//               src={result.trackImg}
//               style={{ width: "70px", height: "70px", margin: "4px" }}
//             />
//             <h4 className="trackItem">{result.trackName} </h4>
//             <p className="artistItem">{result.artistName}</p>
//             <i
//               key={index}
//               role="button"
//               className="plus-button"
//               aria-label="Add Song"
//               onClick={() => openModal(result)}
//             ></i>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import "./Search.css";
import React, { useEffect } from "react";
import { useSearch } from "./SearchContext";

function SearchBar() {
  const { searchInput, setSearchInput, results, fetchData, openModal } =
    useSearch();

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
    </div>
  );
}

export default SearchBar;
