import { useProfile } from "./useProfile";
import { useFollowing } from "./useFollowing";
import { usePlaylist } from "../playlist/usePlaylist";

const Profile = ({ token }: { token: string }) => {
  const { isLoading, data, error: error1 } = useProfile(token);
  const { data: followingData, error: error2 } = useFollowing(token);
  const { data: playlistData, error: error3 } = usePlaylist(token);

  if (isLoading) return <div>Loading...</div>;
  if (error1 || error2 || error3)
    return (
      <div>Error: {error1?.message || error2?.message || error3?.message}</div>
    );

  return (
    <>
      <section className="bg-[#181818] min-h-screen text-white">
        <div>
          {data?.images && data.images[0] ? (
            <img
              src={data?.images[0]?.url}
              alt={`${data?.display_name}'s Avatar`}
              width={200}
              height={200}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <span>No avatar available</span>
          )}
        </div>
        <h2>
          <span>{data?.display_name}</span>
        </h2>
        <ul>
          <li>
            Followers: <span>{data?.followers.total}</span>
          </li>
          <li>
            Following:
            <span>{followingData?.artists.total}</span>
          </li>
          <li>
            Playlist: <span>{playlistData?.total}</span>
          </li>
          <li>
            Product: <span>{data?.product}</span>
          </li>
        </ul>
        {error2 && (
          <div>Error fetching followers: {error2}</div>
        )}
      </section>
    </>
  );
};

export default Profile;
