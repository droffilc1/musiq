export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append(
    "scope",
    "user-read-private user-read-email user-follow-read playlist-read-private"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier");

  if (!verifier) {
    throw new Error("Code verifier is missing.");
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    const errorDetails = await result.json();
    throw new Error(
      `Error: ${errorDetails.error} - ${errorDetails.error_description}`
    );
  }
  const { access_token } = await result.json();

  localStorage.setItem("access_token", access_token);
  localStorage.removeItem("code_verifier");

  return access_token;
}

export async function refreshAccessToken(clientId: string) {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("Refresh token is missing");
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    const errorDetails = await result.json();
    throw new Error(
      `Error: ${errorDetails.error} - ${errorDetails.error_description}`
    );
  }

  const { access_token, refresh_token } = await result.json();
  localStorage.setItem("access_token", access_token);

  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  }
  return access_token;
}

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export async function fetchProfile(token: string): Promise<UserProfile> {
  if (!token) {
    throw new Error("Token is missing or invalid.");
  }

  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  if (!result.ok) {
    if (result.status === 401) {
      throw new Error("Unauthorized: Token might be invalid or expired.");
    }
    throw new Error(`Error: ${result.status} - ${result.statusText}`);
  }

  return await result.json();
}

export async function getUserFollowing(
  token: string
): Promise<SpotifyFollowingResponse> {
  if (!token) {
    throw new Error("Token is missing or invalid.");
  }

  const result = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      method: "GET",
      headers: getAuthHeaders(token),
    }
  );

  if (!result.ok) {
    if (result.status === 401) {
      throw new Error("Unauthorized: Token might be invalid or expired.");
    }
    throw new Error(`Error: ${result.status} - ${result.statusText}`);
  }

  return await result.json();
}

export async function getUserPlaylist(
  token: string
): Promise<Playlist> {
  if (!token) {
    throw new Error("Token is missing or invalid.");
  }

  const result = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  if (!result.ok) {
    if (result.status === 401) {
      throw new Error("Unauthorized: Token might be invalid or expired.");
    }
    throw new Error(`Error: ${result.status} - ${result.statusText}`);
  }

  return await result.json();
}
