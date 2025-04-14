import React, { useState, useEffect } from "react";
import axios from 'axios';

const Session = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [events, setEvents] = useState([]);

  // Event input states
  const [eventTitle, setEventTitle] = useState("");
  const [eventTimeAM, setEventTimeAM] = useState("");

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Save events whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Change month function
  const changeMonth = (step) => {
    let newMonth = currentMonth + step;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Add new event
  const addEvent = async () => {
    if (!eventTitle.trim()) return alert("Event title required");
    if (!eventTimeAM) return alert("Time is required");

    const newEvent = { title: eventTitle, timeAM: eventTimeAM };

    const existingEvent = events.find(
      (e) => e.day === activeDay && e.month === currentMonth + 1 && e.year === currentYear
    );

    if (existingEvent) {
      existingEvent.events.push(newEvent);
    } else {
      events.push({ day: activeDay, month: currentMonth + 1, year: currentYear, events: [newEvent] });
    }

    setEvents([...events]);

    try {
      const response = await axios.post("http://localhost:5000/addsession", {
        title: eventTitle,
        date: `${currentYear}-${currentMonth + 1}-${activeDay}`,
        time: eventTimeAM,
        email: "sanskruti497@gmail.com",
      });

      alert("Event added & email sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email notification.");
    }

    // Clear inputs after adding the event
    setEventTitle("");
    setEventTimeAM("");
  };

  // Delete an event
  const deleteEvent = (title) => {
    const updatedEvents = events
      .map((event) =>
        event.day === activeDay && event.month === currentMonth + 1 && event.year === currentYear
          ? { ...event, events: event.events.filter((e) => e.title !== title) }
          : event
      )
      .filter((event) => event.events.length > 0);

    setEvents(updatedEvents);
  };

  // Generate calendar grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = [];

  for (let i = 1 - firstDay; i <= lastDate; i++) {
    const isToday =
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    const hasEvent = events.some(
      (event) => event.day === i && event.month === currentMonth + 1 && event.year === currentYear
    );

    days.push(
      <div
        key={i}
        className={`day ${i === activeDay ? "active" : ""} ${isToday ? "today" : ""} ${hasEvent ? "event" : ""}`}
        onClick={() => i > 0 && setActiveDay(i)}
      >
        {i > 0 ? i : ""}
      </div>
    );
  }

  return (
    <div className="container">
      {/* Calendar Section */}
      <div className="calendar-container">
        <div className="month-nav">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <span>
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </span>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        <div className="days-grid">{days}</div>
      </div>

      {/* Event Section */}
      <div className="event-section">
        <h3>Add Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <label>Time</label>
        <input type="time" value={eventTimeAM} onChange={(e) => setEventTimeAM(e.target.value)} />
        <button onClick={addEvent}>Add</button>

        {/* Display Events */}
        <h3>Events on {activeDay} {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}</h3>
        <div className="events-list">
          {events
            .filter((event) => event.day === activeDay && event.month === currentMonth + 1 && event.year === currentYear)
            .flatMap((event) => event.events)
            .map((event, index) => (
              <div key={index} className="event">
                <span>{event.title} (Time: {event.timeAM || "N/A"})</span>
                <button onClick={() => deleteEvent(event.title)}>❌</button>
              </div>
            ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 90%;
          max-width: 1700px;
          margin: auto;
          padding: 20px;
          gap: 30px;
        }

        .calendar-container {
          flex: 1;
          max-width: 600px;
          font-family: Arial, sans-serif;
        }

        .month-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background:rgb(11, 102, 79);
          color: white;
          font-weight: bold;
          border-radius: 5px;
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 5px;
        }

        .day {
          width: 45px;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: 1px solid #ddd;
          border-radius: 3px;
          background: white;
          font-weight: bold;
          transition: 0.2s;
        }

        .day.active { background:rgb(85, 178, 148); color: white; }
        .day.today { border: 2px solid red; }
        .day.event { background: rgb(208, 221, 179); }

        .event-section {
          width: 300px;
          padding: 15px;
          border-left: 2px solid #ddd;
          background:rgb(233, 243, 211);
          border-radius: 5px;
        }

        .event-section input,
        .event-section label {
          width: 100%;
          margin-bottom: 8px;
          display: block;
        }

        .event-section button {
          width: 100%;
          padding: 10px;
          background:rgb(92, 194, 167);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default Session;
