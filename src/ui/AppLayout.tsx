import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthProvider";

function AppLayout() {
  const { token, logout } = useAuth();

  return (
    <div>
      <header>
        {token ? (
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>You are not logged in</p>
        )}
      </header>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
