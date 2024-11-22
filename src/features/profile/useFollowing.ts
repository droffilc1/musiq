import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../services/spotifyApi";

export function useFollowing(token: string) {
  const { data, error } = useQuery<SpotifyFollowingResponse, Error>({
    queryKey: ["following", token],
    queryFn: () => getUserFollowing(token),
    enabled: !!token,
  });

  return { data, error };
}
