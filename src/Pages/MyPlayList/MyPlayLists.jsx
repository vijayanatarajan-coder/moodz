import React from "react";
import "./MyPlayLists.css";
import SearchBar from "../../Components/Search/Search";

const MyPlayLists = () => {
  return (
    <main>
      <div className="page-heading-container-myplaylist">
        <h1 className="page-heading-myplaylist-title">MY PLAYLIST</h1>
        <p className="page-heading-myplaylist-paragraph">
          Create a playlist that matches your current mood! Start by searching a
          song, artist, or album below
        </p>
        <br />
        <hr className="page-heading-divider-myplaylist" />
      </div>

      <SearchBar />
    </main>
  );
};

export default MyPlayLists;
