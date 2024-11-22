import { useQuery } from "@tanstack/react-query";
import { getUserPlaylist } from "../../services/spotifyApi";

export function usePlaylist(token: string) {
  const { data, error } = useQuery<Playlist, Error>({
    queryKey: ["playlist", token],
    queryFn: () => getUserPlaylist(token),
    enabled: !!token,
  });

  return { data, error };
}
