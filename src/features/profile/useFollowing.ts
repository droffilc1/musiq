import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../services/spotifyApi";

export function useFollowing(token: string) {
  const { isLoading, data, error } = useQuery<SpotifyFollowingResponse, Error>({
    queryKey: ["following", token],
    queryFn: () => getUserFollowing(token),
    enabled: !!token,
  });

  return { isLoading, data, error };
}
