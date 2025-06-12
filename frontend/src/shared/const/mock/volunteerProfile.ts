// Моки данных волонтеров
export const VOLUNTEERS = [
    {
        id: 1,
        lastName: "Иванов",
        firstName: "Иван",
        middleName: "Иванович",
        birthDate: "1990-01-01",
        email: "ivanov@example.com",
        phone: "+7 (123) 456-78-90",
        skills: "Первая помощь, работа с детьми",
        interests: "Экология, помощь животным",
        points: 20,
        rating: 9.6,
        eventsCount: 5,
        hours: 32,
        certificates: [
            { id: 1, name: "Сертификат волонтера 2023" },
            { id: 2, name: "Первая помощь" },
            { id: 3, name: "Экологический проект" }
        ]
    },
    {
        id: 2,
        lastName: "Петрова",
        firstName: "Мария",
        middleName: "Сергеевна",
        birthDate: "1992-05-15",
        email: "petrova@example.com",
        phone: "+7 (987) 654-32-10",
        skills: "Организация мероприятий, фандрайзинг",
        interests: "Культурные события, образование",
        points: 35,
        rating: 9.8,
        eventsCount: 8,
        hours: 45,
        certificates: [
            { id: 1, name: "Организация мероприятий" },
            { id: 2, name: "Фандрайзинг для НКО" }
        ]
    },
    // Остальные волонтеры...
    {
        id: 3,
        lastName: "Сидоров",
        firstName: "Алексей",
        middleName: "Дмитриевич",
        birthDate: "1988-11-20",
        email: "sidorov@example.com",
        phone: "+7 (555) 123-45-67",
        skills: "IT, менторство",
        interests: "Технологии, образование",
        points: 28,
        rating: 9.5,
        eventsCount: 6,
        hours: 40,
        certificates: [
            { id: 1, name: "Менторство в IT" },
            { id: 2, name: "Основы программирования" }
        ]
    },
    {
        id: 4,
        lastName: "Кузнецова",
        firstName: "Елена",
        middleName: "Андреевна",
        birthDate: "1995-03-10",
        email: "kuznetsova@example.com",
        phone: "+7 (777) 888-99-00",
        skills: "Иностранные языки, переводы",
        interests: "Международные проекты",
        points: 18,
        rating: 9.3,
        eventsCount: 4,
        hours: 25,
        certificates: [
            { id: 1, name: "Английский язык C1" },
            { id: 2, name: "Переводчик-волонтер" }
        ]
    },
    // ... и так далее для остальных 6 волонтеров
];

// Хук для получения данных текущего пользователя
export const useCurrentVolunteer = () => {
    // В реальном приложении здесь будет запрос к API или получение из контекста
    // Для демонстрации берем первого волонтера
    return VOLUNTEERS[0];
};