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
  const [playlists, setPlaylists] = useState({});
  const [playlistOrder, setPlaylistOrder] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const API_KEY = 523532;

  const addSongToPlaylist = useCallback((playlistId, song) => {
    setPlaylists((prev) => {
      const updatedPlaylist = {
        ...prev[playlistId],
        songs: [...(prev[playlistId]?.songs || []), song],
      };
      return { ...prev, [playlistId]: updatedPlaylist };
    });

    setExistingPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songCount: (playlist.songCount || 0) + 1 }
          : playlist
      )
    );
  }, []);

  const getPlaylistSongs = useCallback(
    (playlistId) => {
      return playlists[playlistId]?.songs || [];
    },
    [playlists]
  );

  const removeSongFromPlaylist = useCallback((playlistId, songIndex) => {
    setPlaylists((prev) => ({
      ...prev,
      [playlistId]: {
        ...prev[playlistId],
        songs: prev[playlistId].songs.filter((_, index) => index !== songIndex),
      },
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
        setShowSearchResults(true);
      } else {
        setResults([]);
        setShowSearchResults(false);
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

  const clearSearchResults = useCallback(() => {
    setSearchInput("");
    setResults([]);
    setShowSearchResults(false);
  }, []);

  const updatePlaylist = useCallback((playlistId, newName) => {
    setPlaylists((prev) => ({
      ...prev,
      [playlistId]: { ...prev[playlistId], name: newName },
    }));
    setExistingPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, name: newName } : playlist
      )
    );
  }, []);

  const deletePlaylist = useCallback((playlistId) => {
    setPlaylists((prev) => {
      const { [playlistId]: removed, ...rest } = prev;
      return rest;
    });
    setExistingPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  }, []);

  const addNewPlaylist = useCallback((newPlaylistName, song = null) => {
    const newPlaylistId = Date.now().toString();
    const newPlaylist = { name: newPlaylistName, songs: song ? [song] : [] };

    setPlaylists((prev) => ({
      ...prev,
      [newPlaylistId]: newPlaylist,
    }));

    setExistingPlaylists((prev) => [
      ...prev,
      { id: newPlaylistId, name: newPlaylistName },
    ]);

    setPlaylistOrder((prev) => [...prev, newPlaylistId]);

    return newPlaylistId;
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
        addSongToPlaylist,
        playlists,
        getPlaylistSongs,
        removeSongFromPlaylist,
        clearSearchResults,
        showSearchResults,
        playlistOrder,
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
