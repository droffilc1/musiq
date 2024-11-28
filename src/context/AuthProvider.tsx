/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken, refreshAccessToken } from "../services/spotifyApi";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("access_token");
  });
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  const login = useCallback(async () => {
    await redirectToAuthCodeFlow(clientId);
  }, [clientId]);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("access_token");
  }, []);

  const safeSetToken = useCallback((newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("access_token", newToken);
    } else {
      localStorage.removeItem("access_token");
    }
    setToken(newToken);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const processCallback = async () => {
      if (code) {
        try {
          const accessToken = await getAccessToken(clientId, code);
          safeSetToken(accessToken);
          window.history.replaceState({}, document.title, "/");
        } catch (error) {
          console.error("Failed to fetch access token:", error);
          logout();
        }
      }
    };
    processCallback();
  }, [clientId, logout, safeSetToken]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(async () => {
        try {
          const newToken = await refreshAccessToken(clientId);
          safeSetToken(newToken);
        } catch (error) {
          console.error("Failed to refresh access token", error);
          login();
        }
      }, 3600 * 1000 - 10000); // Refresh 10 seconds before expiry

      return () => clearInterval(interval);
    }
  }, [token, clientId, login, safeSetToken]);

  return (
    <AuthContext.Provider value={{
      token,
      setToken: safeSetToken,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
