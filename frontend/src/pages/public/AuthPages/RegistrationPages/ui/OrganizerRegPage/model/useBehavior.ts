import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@api";

export const useBehavior = () => {
  const [orgName, setOrgName] = useState("");
  const [inn, setInn] = useState("");
  const [region, setRegion] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Валидация обязательных полей
    if (!orgName || !inn || !region || !lastName || !firstName || !email || !password) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Валидация ИНН (примерная проверка длины)
    if (inn.length !== 10 && inn.length !== 12) {
      setError("ИНН должен содержать 10 или 12 цифр");
      return;
    }

    try {
      // const { data } = await AuthAPI.registerOrganizer({
      //   org_name: orgName,
      //   inn,
      //   region,
      //   last_name: lastName,
      //   first_name: firstName,
      //   middle_name: middleName,
      //   email,
      //   password,
      // });
      const data = {
        access: "доступ",
        refresh: "Обновление токена"
      }
      // Сохраняем токены
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Перенаправляем на dashboard организатора
      navigate("/organizer/profile");

    } catch (err) {
      console.error("Registration error:", err);
      
      // if (err.response?.data?.email) {
      //   setError("Пользователь с таким email уже существует");
      // } else if (err.response?.data?.inn) {
      //   setError("Организация с таким ИНН уже зарегистрирована");
      // } else if (err.response?.data?.password) {
      //   setError("Пароль слишком простой");
      // } else {
      //   setError("Произошла ошибка при регистрации");
      // }
    }
  };

  return {
    orgName,
    inn,
    region,
    lastName,
    firstName,
    middleName,
    email,
    password,
    setOrgName,
    setInn,
    setRegion,
    setLastName,
    setFirstName,
    setMiddleName,
    setEmail,
    setPassword,
    handleRegister,
    error,
  };
};