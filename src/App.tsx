import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Profile from "./features/profile/Profile.tsx";
import {
  getAccessToken,
  redirectToAuthCodeFlow,
  refreshAccessToken,
} from "./services/spotifyApi.ts";
import AppLayout from "./ui/AppLayout.tsx";
import Error from "./ui/Error.tsx";
import Sidebar from "./ui/Sidebar.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initToken = async () => {
      const storedToken = localStorage.getItem("access_token");

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
        try {
          const accessToken = await getAccessToken(clientId, code);
          setToken(accessToken);
          localStorage.setItem("access_token", accessToken);
          window.history.replaceState({}, document.title, "/profile");
        } catch (error) {
          console.error("Failed to fetch access token", error);
        }
      }
    };
    initToken();
  }, []);

  useEffect(() => {
    if (token) {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

      const interval = setInterval(async () => {
        try {
          const newToken = await refreshAccessToken(clientId);
          setToken(newToken);
          localStorage.setItem("access_token", newToken);
        } catch (error) {
          console.error("Failed to refresh access token", error);
        }
      }, 3600 * 1000 - 10000); // Refresh 10 seconds before expiry

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [token]);

  if (!token) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
          <Route path="/" element={<Sidebar />} />
            <Route path="profile" element={<Profile token={token} />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
