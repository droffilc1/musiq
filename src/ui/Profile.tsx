const Profile = () => {
  return (
    <>
      <h1>Display your Spotify profile data</h1>

      <section>
        <h2>
          Logged in as <span>displayName</span>
        </h2>
        <span>Avatar</span>
        <ul>
          <li>User ID: <span>id</span></li>
          <li>Email: <span>email</span></li>
          <li>Spotify URI: <span>uri</span></li>
          <li>Link: <span>Link</span></li>
          <li>Profile Image: <span>imageUrl</span></li>
        </ul>
      </section>
    </>
  );
};

export default Profile;
