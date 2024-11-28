import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./context/AuthProvider.tsx";

import Profile from "./features/profile/Profile.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Error from "./ui/Error.tsx";
import LoginScreen from "./ui/LoginScreen.tsx";
import Callback from "./features/auth/Callback.tsx";
import ProtectedRoute from "./features/auth/ProtectedRoute.tsx";
import Playlist from "./features/playlist/Playlist.tsx";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AppLayout />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/playlist",
    element: <Playlist />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },

]);

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
