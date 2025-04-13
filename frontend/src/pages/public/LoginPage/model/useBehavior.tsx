import { useState } from "react";

export const useBehavior = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Пожалуйста, введите email и пароль.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ошибка входа");
      } else {
        setSuccess("Вы успешно вошли!");
      }
    } catch (err) {
      setError("Сервер недоступен.");
    }
  };

  return {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleLogin,
  };
}