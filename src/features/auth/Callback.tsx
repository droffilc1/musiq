import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Callback = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      setIsChecking(false);
    }
  }, [token, navigate]);

  if (isChecking) {
    return <div>Processing...</div>;
  }

  return <div>No token available. Please try logging in again.</div>;
};

export default Callback;
