import { useState } from "react";

const events = [
    {
        title: "Апрельский субботник",
        dateRange: "12 апреля — 13 апреля 2025",
        time: "11:00 - 16:00",
        location: "ул. Ясная, 18, г. Екатеринбург",
        category: "Экология",
        imageUrl: "/images/brooms.jpg",
    },
    {
        title: "Сортировка пластика",
        dateRange: "1 апреля — 31 мая 2025",
        time: "9:00 - 20:00",
        location: "ул. Маневровая, 35, г. Екатеринбург",
        category: "Экология",
        imageUrl: "/images/plastic.jpg",
    },
    {
        title: "Сбор макулатуры",
        dateRange: "1 апреля — 30 апреля 2025",
        time: "9:00 - 20:00",
        location: "ул. Монтажников, 8, г. Екатеринбург",
        category: "Экология",
        imageUrl: "/images/paper.jpg",
    },
    {
        title: "Сбор батареек",
        dateRange: "1 апреля — 30 апреля 2025",
        time: "9:00 - 20:00",
        location: "ул. Готвальда, 21, г. Екатеринбург",
        category: "Экология",
        imageUrl: "/images/batteries.jpg",
    },
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
    if (isNaN(day) || month === undefined) return null;

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
        location: "",
        date: "",
        category: "",
    });

    const [filteredEvents, setFilteredEvents] = useState(events);

    const handleInputChange = (field: keyof typeof search, value: string) => {
        setSearch(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSearch = () => {
        const searchDate = parseRussianDate(search.date);

        const filtered = events.filter(event => {
            const locationMatch = event.location.toLowerCase().includes(search.location.toLowerCase());
            const categoryMatch = event.category.toLowerCase().includes(search.category.toLowerCase());
            const dateMatch =
                !search.date.trim() ||
                (searchDate && isDateInRange(event.dateRange, searchDate));

            return locationMatch && categoryMatch && dateMatch;
        });

        setFilteredEvents(filtered);
    };

    return {
        search,
        setSearch,
        handleSearch,
        filteredEvents,
        setFilteredEvents,
        handleInputChange
    };
}