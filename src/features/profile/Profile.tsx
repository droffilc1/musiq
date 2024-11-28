import { useAuth } from "../../context/AuthProvider";
import { useProfile } from "./useProfile";
import { useFollowing } from "./useFollowing";
import { usePlaylist } from "../playlist/usePlaylist";

const Profile = () => {
  const { token, logout } = useAuth();
  const {
    isLoading: isLoadingProfile,
    data: profileData,
    error: profileError
  } = useProfile(token!);

  const {
    isLoading: isLoadingFollowing,
    data: followingData,
    error: followingError
  } = useFollowing(token!);

  const {
    isLoading: isLoadingPlaylist,
    data: playlistData,
    error: playlistError
  } = usePlaylist(token!);

  const isLoading = isLoadingProfile || isLoadingFollowing || isLoadingPlaylist;

  const errors = [profileError, followingError, playlistError].filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (errors.length > 0) {
    return (
      <div className="bg-[#181818] min-h-screen text-white flex flex-col justify-center items-center p-6">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 mb-4">Error Fetching Profile</h2>
          {errors.map((error, index) => (
            <p key={index} className="text-red-300 mb-2">
              {error?.message || 'An unexpected error occurred'}
            </p>
          ))}
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout and Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] min-h-screen text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          {profileData?.images && profileData.images[0] ? (
            <img
              src={profileData.images[0].url}
              alt={`${profileData.display_name}'s Avatar`}
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center">
              No avatar
            </div>
          )}

          <div>
            <h2 className="text-4xl font-bold mb-2">{profileData?.display_name}</h2>
            <p className="text-gray-400">Spotify {profileData?.product} User</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Followers"
            value={profileData?.followers.total.toLocaleString() || '0'}
          />
          <StatCard
            label="Following"
            value={followingData?.artists.total.toLocaleString() || '0'}
          />
          <StatCard
            label="Playlists"
            value={playlistData?.total.toLocaleString() || '0'}
          />
          <StatCard
            label="Product"
            value={profileData?.product || 'N/A'}
          />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#282828] p-4 rounded-lg text-center">
    <div className="text-3xl font-bold text-green-500">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

export default Profile;
