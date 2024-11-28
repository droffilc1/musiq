import { useAuth } from "../../context/AuthProvider";
import { usePlaylist } from "./usePlaylist";
import PlaylistCard from "./PlaylistCard";

const Playlist = () => {
  const { token } = useAuth();
  const { data: playlistData, isLoading: isLoadingPlaylist } = usePlaylist(
    token!,
  );

  if (isLoadingPlaylist) {
    return <div>Loading your playlists...</div>;
  }

  if (!playlistData || playlistData.items.length === 0) {
    return <div>No playlists found</div>;
  }

  return (
    <>
      <h2>Your Playlists</h2>
      <ul>
        {playlistData.items.map((el) => (
          <PlaylistCard
            key={el?.id}
            name={el?.name}
            imageUrl={el?.images[0]?.url || ""}
            spotifyUrl={el?.external_urls?.spotify}
          />
        ))}
      </ul>
    </>
  );
};

export default Playlist;
