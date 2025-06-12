import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { access } from "fs";

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

    try {
      // const { data } = await AuthAPI.registerVolunteer({
      //   last_name: lastName,
      //   first_name: firstName,
      //   middle_name: middleName,
      //   birth_date: birthDate,
      //   email,
      //   password,
      // });

      const data = {
        access: "доступ",
        refresh: "Обновление токена"
      }
      // Сохраняем токены после успешной регистрации
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Перенаправляем на страницу волонтера
      navigate("/volunteer/profile");

    } catch (err) {
      console.error("Registration error:", err);
      
      // Обработка различных ошибок
      // if (err.response?.data?.email) {
      //   setError("Пользователь с таким email уже существует");
      // } else if (err.response?.data?.password) {
      //   setError("Пароль слишком простой");
      // } else {
      //   setError("Произошла ошибка при регистрации");
      // }
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