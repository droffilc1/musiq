import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Button from "./Button";

const LoginScreen = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section className="bg-[url('/assets/hero.png')] h-dvh bg-no-repeat bg-cover text-blue-50 rounded-none">
      <div className="w-1/2 p-6">
        <h2 className="text-5xl font-bold mb-12 mt-40 leading-normal">
          All the <span className="text-pink-600">Best Songs</span> <br /> in One Place
        </h2>
        <Button onClick={handleLogin}>Login to Spotify</Button>
      </div>
    </section>
  );
};
export default LoginScreen;
