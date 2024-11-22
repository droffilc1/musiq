import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Profile from "./features/profile/Profile.tsx";
import {
  getAccessToken,
  redirectToAuthCodeFlow,
  refreshAccessToken,
} from "./services/spotifyApi.ts";

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initToken = async () => {
      const storedToken = localStorage.getItem("access-token");

      if (storedToken) {
        setToken(storedToken);
        return;
      }

      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        await redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        setToken(accessToken);
        localStorage.setItem("access_token", accessToken);
        window.history.replaceState({}, document.title, "/");
      }
    };
    initToken();
  }, []);

  useEffect(() => {
    if (token) {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

      const interval = setInterval(
        async () => {
          try {
            const newToken = await refreshAccessToken(clientId);
            setToken(newToken);
            window.history.replaceState({}, document.title, "/");
          } catch (error) {
            console.error("Failed to refresh access token", error);
          }
        },
        3600 * 1000 - 10000
      ); // Refresh 10 seconds before expiry

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [token]);

  if (!token) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Profile token={token} />
    </QueryClientProvider>
  );
};

export default App;
