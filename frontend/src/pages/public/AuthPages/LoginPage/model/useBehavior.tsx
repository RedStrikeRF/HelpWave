import { USERS } from "@shared/const/mock/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBehavior = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    // Поиск пользователя в моках
    const user = USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      setError("Неверный логин или пароль");
      return;
    }

    try {
      // Имитация успешного входа
      const data = {
        access: "access_token_" + Math.random().toString(36).substring(2),
        refresh: "refresh_token_" + Math.random().toString(36).substring(2),
        [user.role + "_profile"]: true // Добавляем профиль в зависимости от роли
      };

      // Сохраняем токены в localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Перенаправляем в зависимости от роли
      if (data.volunteer_profile) {
        navigate("/volunteer/dashboard");
      } else if (data.organizer_profile) {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Произошла ошибка при входе");
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