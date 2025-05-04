import { useState } from "react";
import "./EventsPage.scss";
import { Button, Card, Input } from "@shared/ui";
import { useBehavior } from '../model';

export const EventsPage = () => {
    const {
        search,
        setSearch,
        handleSearch,
        handleInputChange,
        filteredEvents,
        setFilteredEvents
    } = useBehavior();

    return (
        <div className="events-page">
            <h2 className="title">Найдите подходящее мероприятие</h2>

            <div className="search-bar">
                <div className="search-inputs">
                    <div className="input-content">
                        <p>Местоположение</p>
                        <div className="input-group">
                            <span>📍</span>
                            <Input
                                type="text"
                                placeholder="Местоположение"
                                value={search.location}
                                onChange={e => handleInputChange("location", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-content">
                        <p>Дата</p>
                        <div className="input-group">
                            <span>📅</span>
                            <Input
                                type="text"
                                placeholder="Дата (например: 13 апреля)"
                                value={search.date}
                                onChange={e => handleInputChange("date", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-content">
                        <p>Категория</p>
                        <div className="input-group">
                            <span>🏷️</span>
                            <Input
                                type="text"
                                placeholder="Категория"
                                value={search.category}
                                onChange={e => handleInputChange("category", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button className="search-btn" onClick={handleSearch}>
                    Найти
                </Button>
            </div>

            <div className="events-grid">
                {filteredEvents.map((event, index) => (
                    <Card
                        key={index}
                        title={event.title}
                        dateRange={event.dateRange}
                        time={event.time}
                        location={event.location}
                        category={event.category}
                        imageUrl={event.imageUrl}
                        className="event-card"
                    />
                ))}
                {filteredEvents.length === 0 && (
                    <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#385A64" }}>
                        Мероприятия не найдены.
                    </p>
                )}
            </div>
        </div>
    );
};
