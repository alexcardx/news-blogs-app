import { useState } from "react";
import { CalendarContext } from "./CalendarContext";

const CalendarProvider = ({ children }) => {
  const [isNoEvents, setIsNoEvents] = useState(false);
  const [isEventPresent, setIsEventPresent] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState(
    JSON.parse(localStorage.getItem("calendarEvents")) || []
  );
  const [calendarEvent, setCalendarEvent] = useState(null);
  const [chosenDate, setChosenDate] = useState(null);

  return (
    <CalendarContext.Provider
      value={{
        isNoEvents,
        setIsNoEvents,
        isEventPresent,
        setIsEventPresent,
        calendarEvents,
        setCalendarEvents,
        calendarEvent,
        setCalendarEvent,
        chosenDate,
        setChosenDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
