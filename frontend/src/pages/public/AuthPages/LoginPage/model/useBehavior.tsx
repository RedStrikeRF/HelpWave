import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@api";

export const useBehavior = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await AuthAPI.login({
        username,
        password,
      });

      // Сохраняем токены в localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      
      if (data.volunteer_profile) {
        navigate("/volunteer/dashboard");
      } else if (data.organizer_profile) {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Неверный логин или пароль");
      console.error("Login error:", err);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    error,
  };
};