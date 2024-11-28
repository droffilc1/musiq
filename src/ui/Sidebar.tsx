import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside>
    <nav>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/playlist">Playlist</Link>
        </li>
        <li>
          <Link to="/artists">Top Artists</Link>
        </li>
        <li>
          <Link to="/songs">Top Tracks</Link>
        </li>
        <li>
          <Link to="/albums">Top Albums</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
