// import React from "react";
// import "./MyPlayLists.css";
// import SongModal from "../../Components/Modal/SongModal";
// import SearchBar from "../../Components/Search/Search";

// const MyPlayLists = () => {
//   return (
//     <main>
//       <div className="page-heading-container-myplaylist">
//         <h1 className="page-heading-myplaylist-title">MY PLAYLISTS</h1>
//         <p className="page-heading-myplaylist-paragraph">
//           Create a playlist that matches your current mood! Start by searching a
//           song, artist, or album below
//         </p>
//         <br />
//         <hr className="page-heading-divider-myplaylist" />
//       </div>
//       <SongModal />
//     </main>
//   );
// };

// export default MyPlayLists;

import React from "react";
import "./MyPlayLists.css";
import SongModal from "../../Components/Modal/SongModal";
import SearchBar from "../../Components/Search/Search";
import { SearchProvider } from "../../Components/Search/SearchContext";

function MyPlayLists() {
  return (
    <main>
      <div id="main-content">
        <div className="page-heading-container-myplaylist">
          <h1 className="page-heading-myplaylist-title">MY PLAYLISTS</h1>
          <p className="page-heading-myplaylist-paragraph">
            Create a playlist that matches your current mood! Start by searching
            a song, artist, or album below
          </p>
          <br />
          <hr className="page-heading-divider-myplaylist" />
        </div>
        <SearchProvider>
          <SearchBar />
          <SongModal />
        </SearchProvider>
      </div>
    </main>
  );
}

export default MyPlayLists;
