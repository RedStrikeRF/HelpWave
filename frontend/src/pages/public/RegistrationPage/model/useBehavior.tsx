import { useState } from "react";

export const useBehavior = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!surname || !name || !patronymic || !birthDate || !email || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surname,
          name,
          patronymic,
          birthDate,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ошибка регистрации");
      } else {
        setSuccess("Вы успешно зарегистрированы!");
      }
    } catch (err) {
      setError("Сервер недоступен.");
    }
  };

  return {
    surname,
    name,
    patronymic,
    birthDate,
    email,
    password,
    error,
    success,
    setSurname,
    setName,
    setPatronymic,
    setBirthDate,
    setEmail,
    setPassword,
    handleRegister,
  };
};
