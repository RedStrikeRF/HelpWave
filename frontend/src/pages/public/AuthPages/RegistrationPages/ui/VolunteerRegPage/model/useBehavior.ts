import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { access } from "fs";
import { USERS } from "@shared/const/mock/register";

export const useBehavior = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!lastName || !firstName || !email || !password || !birthDate) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Проверка на существующего пользователя по email
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
      setError("Пользователь с таким email уже существует");
      return;
    }

    // Проверка сложности пароля (простая проверка)
    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов");
      return;
    }

    try {
      // Имитация успешной регистрации
      const data = {
        access: "access_token_" + Math.random().toString(36).substring(2),
        refresh: "refresh_token_" + Math.random().toString(36).substring(2)
      };

      // Сохраняем токены после успешной регистрации
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Добавляем нового пользователя в моки (для демонстрации)
      const newUser = {
        lastName,
        firstName,
        middleName,
        birthDate,
        email,
        password
      };
      USERS.push(newUser);

      // Перенаправляем на страницу волонтера
      navigate("/volunteer/profile");

    } catch (err) {
      console.error("Registration error:", err);
      setError("Произошла ошибка при регистрации");
    }
  };

  return {
    lastName,
    firstName,
    middleName,
    birthDate,
    email,
    password,
    setLastName,
    setFirstName,
    setMiddleName,
    setBirthDate,
    setEmail,
    setPassword,
    handleRegister,
    error,
  };
};