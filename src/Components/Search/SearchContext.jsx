import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [existingPlaylists, setExistingPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState({}); //NEW
  const API_KEY = 523532;

  const addSongToPlaylist = useCallback((playlistName, song) => {
    setPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      [playlistName]: [...(prevPlaylists[playlistName] || []), song],
    }));
    setExistingPlaylists((prevPlaylists) => {
      if (!prevPlaylists.includes(playlistName)) {
        return [...prevPlaylists, playlistName];
      }
      return prevPlaylists;
    });
  }, []); //NEW

  const getPlaylistSongs = useCallback(
    (playlistName) => {
      return playlists[playlistName] || [];
    },
    [playlists]
  );

  const removeSongFromPlaylist = useCallback((playlistName, songIndex) => {
    setPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      [playlistName]: prevPlaylists[playlistName].filter(
        (_, index) => index !== songIndex
      ),
    }));
  }, []);

  useEffect(() => {
    const storedPlaylists =
      JSON.parse(localStorage.getItem("existingPlaylists")) || [];
    setExistingPlaylists(storedPlaylists);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "existingPlaylists",
      JSON.stringify(existingPlaylists)
    );
  }, [existingPlaylists]);

  const fetchData = useCallback(async () => {
    const [artistName, trackName] = searchInput
      .split("-")
      .map((item) => item.trim());
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
    }
  }, [searchInput]);

  const openModal = useCallback((songData) => {
    setSelectedSong(songData);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSong(null);
  }, []);

  const updatePlaylist = useCallback((index, newText) => {
    setExistingPlaylists((prev) => {
      const updatedPlaylists = prev.map((item, i) =>
        i === index ? newText : item
      );
      localStorage.setItem(
        "existingPlaylists",
        JSON.stringify(updatedPlaylists)
      );
      return updatedPlaylists;
    });
  }, []);

  const deletePlaylist = useCallback((index) => {
    setExistingPlaylists((prev) => {
      const updatedPlaylists = prev.filter((_, i) => i !== index);
      localStorage.setItem(
        "existingPlaylists",
        JSON.stringify(updatedPlaylists)
      );
      return updatedPlaylists;
    });
  }, []);

  const addNewPlaylist = useCallback((newPlaylist) => {
    setExistingPlaylists((prev) => {
      const updatedPlaylists = [...prev, newPlaylist];
      localStorage.setItem(
        "existingPlaylists",
        JSON.stringify(updatedPlaylists)
      );
      return updatedPlaylists;
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        results,
        fetchData,
        isModalOpen,
        openModal,
        closeModal,
        selectedSong,
        existingPlaylists,
        updatePlaylist,
        deletePlaylist,
        addNewPlaylist,
        addSongToPlaylist, //NEW
        playlists, //NEW
        getPlaylistSongs,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
