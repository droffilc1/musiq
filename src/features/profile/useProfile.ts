import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../services/spotifyApi";

export function useProfile(token: string) {
  const { isLoading, data, error } = useQuery<UserProfile, Error>({
    queryKey: ["profile", token],
    queryFn: () => fetchProfile(token),
    enabled: !!token,
  });

  return { isLoading, data, error };
}
