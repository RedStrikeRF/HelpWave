import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const events = [
    {
        id: 1,
        title: "Апрельский субботник",
        dateRange: "12 апреля — 13 апреля 2025",
        time: "11:00 - 16:00",
        location: "ул. Ясная, 18, г. Екатеринбург",
        category: "Экология",
        organizer: "М. Г. Благоустройство",
        imageUrl: "/images/brooms.jpg",
        status: 'pending',
        description: "Уборка территории парка и посадка деревьев"
    },
    {
        id: 2,
        title: "Сбор макулатуры",
        dateRange: "30 апреля — 30 апреля 2026",
        time: "18:00 - 22:00",
        location: "ул. Монтажников, 8, г. Екатеринбург",
        category: "Экология",
        organizer: "В. Г. Благоустройство",
        imageUrl: "/images/paper.jpg",
        status: 'approved',
        description: "Прием макулатуры для последующей переработки"
    },
    {
        id: 3,
        title: "Сортировка пластика",
        dateRange: "21 июня — 21 июня 2026",
        time: "19:00 - 20:00",
        location: "ул. Маневровая, 35, г. Екатеринбург",
        category: "Экология",
        organizer: "К. А. Благоустройство",
        imageUrl: "/images/plastic.jpg",
        status: 'approved',
        description: "Сортировка пластиковых отходов по типам"
    },
    {
        id: 4,
        title: "Сбор батареек",
        dateRange: "30 апреля — 30 апреля 2026",
        time: "19:00 - 20:00",
        location: "ул. Главная, 5, г. Екатеринбург",
        category: "Экология",
        organizer: "Л. Г. Благоустройство",
        imageUrl: "/images/batteries.jpg",
        status: 'approved',
        description: "Сбор и утилизация использованных батареек"
    },
    {
        id: 5,
        title: "Озеленение двора",
        dateRange: "15 мая — 15 мая 2025",
        time: "10:00 - 14:00",
        location: "ул. Садовая, 12, г. Екатеринбург",
        category: "Экология",
        organizer: "Т. В. Благоустройство",
        imageUrl: "/images/greening.jpg",
        status: 'approved',
        description: "Посадка цветов и кустарников во дворе"
    },
    {
        id: 6,
        title: "Экологический лекторий",
        dateRange: "22 апреля — 22 апреля 2025",
        time: "18:00 - 20:00",
        location: "ул. Ленина, 24, г. Екатеринбург",
        category: "Экология",
        organizer: "С. П. Просвещение",
        imageUrl: "/images/lecture.jpg",
        status: 'approved',
        description: "Лекции о раздельном сборе отходов"
    },
    {
        id: 7,
        title: "Уборка берега реки",
        dateRange: "8 июня — 8 июня 2025",
        time: "12:00 - 16:00",
        location: "наб. реки Исеть, г. Екатеринбург",
        category: "Экология",
        organizer: "Р. О. Чистота",
        imageUrl: "/images/river.jpg",
        status: 'approved',
        description: "Уборка мусора с береговой линии"
    },
    {
        id: 8,
        title: "Сбор крышечек",
        dateRange: "1 мая — 31 мая 2025",
        time: "10:00 - 18:00",
        location: "ул. Мира, 15, г. Екатеринбург",
        category: "Экология",
        organizer: "Д. К. Добро",
        imageUrl: "/images/caps.jpg",
        status: 'approved',
        description: "Акция по сбору пластиковых крышечек"
    },
    {
        id: 9,
        title: "Экскурсия на перерабатывающий завод",
        dateRange: "17 мая — 17 мая 2025",
        time: "14:00 - 16:00",
        location: "ул. Заводская, 3, г. Екатеринбург",
        category: "Экология",
        organizer: "З. В. Переработка",
        imageUrl: "/images/factory.jpg",
        status: 'approved',
        description: "Знакомство с процессом переработки отходов"
    },
    {
        id: 10,
        title: "Мастер-класс по экопривычкам",
        dateRange: "5 июня — 5 июня 2025",
        time: "17:00 - 19:00",
        location: "ул. Экологическая, 7, г. Екатеринбург",
        category: "Экология",
        organizer: "Э. В. Устойчивость",
        imageUrl: "/images/workshop.jpg",
        status: 'approved',
        description: "Практические советы по уменьшению экоследа"
    }
];

const parseRussianDate = (input: string) => {
    const months: Record<string, number> = {
        "января": 0, "февраля": 1, "марта": 2, "апреля": 3,
        "мая": 4, "июня": 5, "июля": 6, "августа": 7,
        "сентября": 8, "октября": 9, "ноября": 10, "декабря": 11,
    };

    const parts = input.trim().split(" ");
    if (parts.length < 2) return null;
    const day = parseInt(parts[0]);
    const month = months[parts[1].toLowerCase()];
    if (isNaN(day)) return null;
    if (month === undefined) return null;

    return new Date(2025, month, day);
};

const isDateInRange = (range: string, targetDate: Date) => {
    const [startStr, endStr] = range.split(" — ");
    const start = parseRussianDate(startStr);
    const end = parseRussianDate(endStr.replace(/\s\d{4}$/, ""));
    if (!start || !end) return false;

    const yearMatch = endStr.match(/\d{4}$/);
    if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        start.setFullYear(year);
        end.setFullYear(year);
    }

    return targetDate >= start && targetDate <= end;
};

export const useBehavior = () => {
    const [search, setSearch] = useState({
        location: "г. Екатеринбург",
        date: "12.04.2025",
        category: "Экология",
    });
    const navigate = useNavigate();

    const [filteredEvents, setFilteredEvents] = useState(events);

    const handleInputChange = (field: keyof typeof search, value: string) => {
        setSearch(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSearch = () => {
        // Преобразуем дату из формата DD.MM.YYYY в русский текст
        const dateParts = search.date.split('.');
        const russianDate = `${parseInt(dateParts[0])} апреля ${dateParts[2]}`;

        const searchDate = parseRussianDate(russianDate);

        const filtered = events.filter(event => {
            const locationMatch = event.location.toLowerCase().includes(search.location.toLowerCase());
            const categoryMatch = event.category.toLowerCase() === search.category.toLowerCase();
            const dateMatch = !search.date.trim() || (searchDate && isDateInRange(event.dateRange, searchDate));

            return locationMatch && categoryMatch && dateMatch;
        });

        setFilteredEvents(filtered);
    };

    // Автоматически выполняем поиск при изменении параметров
    useEffect(() => {
        handleSearch();
    }, [search]);

    const redirectToEvent = (id: number) => {
        navigate(`/events/${id}`);
    };

    return {
        search,
        setSearch,
        handleSearch,
        filteredEvents,
        setFilteredEvents,
        redirectToEvent,
        handleInputChange
    };
}