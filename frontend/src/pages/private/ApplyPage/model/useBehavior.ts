import { useState } from 'react';

export const useBehavior = () => {
    const [requestData] = useState({
        participantName: "Иванов Иван Иванович",
        age: 28,
        email: "ivanov@example.com",
        phone: "+7 (999) 123-45-67",
        participationScore: 85,
        rating: 4.7,
        eventsCount: 12,
        status: "pending"
    });

    const handleApprove = () => {
        console.log("Заявка одобрена");
        // Здесь будет логика одобрения заявки
    };

    const handleRate = (rating: number) => {
        console.log(`Оценка ${rating}/10 сохранена`);
        // Здесь будет логика сохранения оценки
    };

    return {
        requestData,
        handleApprove,
        handleRate
    };
};