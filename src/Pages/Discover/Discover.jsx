import React from "react";
import "./Discover.css";
import DisplayPlayList from "../../Components/DisplayPlayList/DisplayPlayList";
import PageHeading from "../../Components/PageHeading/PageHeading";

const Discover = () => {
  return (
    <main>
      <PageHeading
        title="DISCOVER"
        paragraph="Get some inspiration from one of our curated playlists! You can always create your own"
        link="#"
      />
      <DisplayPlayList />
    </main>
  );
};

export default Discover;
