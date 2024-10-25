import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/registrasi-event-olahraga');
                setEvents(response.data.data);
            } catch (error) {
                setError("There was an error fetching the events!");
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <p className="text-center">Loading events...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-center">Event List</h2>
            <ul className="list-group">
                {events.map(event => (
                    <li key={event.id} className="list-group-item">
                        {event.participant_name} - {event.event_name} ({event.event_date}) - {event.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
