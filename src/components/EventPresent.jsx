import CalendarForm from "./CalendarForm";
import { useState, useContext } from "react";
import FullEventList from "./FullEventList";
import DeleteConfirmation from "./DeleteConfirmation";
import Button from "./Button";
import { formateDate } from "../utils/helpers";
import { CalendarContext } from "./context/CalendarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const EventPresent = ({ setConfirmation, confirmation }) => {
  const [addNewEvent, setAddNewEvent] = useState(false);
  const [isFullList, setIsFullList] = useState(false);
  const [deletedEvent, setDeletedEvent] = useState(null);
  const {
    setIsNoEvents,
    setIsEventPresent,
    calendarEvents,
    setCalendarEvents,
    calendarEvent,
    setCalendarEvent,
  } = useContext(CalendarContext);

  const handleDeletionAllDayEvents = () => {
    const updatedCalendarEvents = calendarEvents.filter(
      (el) => el.date != calendarEvent.date
    );
    setCalendarEvents(updatedCalendarEvents);
    setCalendarEvent(null);
    setIsEventPresent((prev) => !prev);
    setIsNoEvents((prev) => !prev);
    localStorage.setItem(
      "calendarEvents",
      JSON.stringify(updatedCalendarEvents)
    );
    setConfirmation((prev) => !prev);
  };

  const handleDeletionDayEvent = () => {
    const dayAllEvents = calendarEvent.dayAllEvents.filter(
      (el) => el.title !== deletedEvent.title
    );
    const updatedCalendarEvent = {
      ...calendarEvent,
      dayAllEvents: dayAllEvents,
    };

    if (!updatedCalendarEvent.dayAllEvents.length) {
      const updatedCalendarEvents = [
        ...calendarEvents.filter((el) => el.date != calendarEvent.date),
      ];

      setCalendarEvents(updatedCalendarEvents);
      setIsEventPresent((prev) => !prev);
      setIsNoEvents((prev) => !prev);
      setCalendarEvent(null);
      localStorage.setItem(
        "calendarEvents",
        JSON.stringify(updatedCalendarEvents)
      );
      console.log(updatedCalendarEvents);
    } else {
      const updatedCalendarEvents = [
        ...calendarEvents.filter((el) => el.date != calendarEvent.date),
        updatedCalendarEvent,
      ];

      setCalendarEvents(updatedCalendarEvents);
      setCalendarEvent(updatedCalendarEvent);
      localStorage.setItem(
        "calendarEvents",
        JSON.stringify(updatedCalendarEvents)
      );
    }
    setConfirmation((prev) => !prev);
  };

  return (
    <>
      {confirmation && (
        <DeleteConfirmation
          title="Delete Confirmation"
          message={`${
            deletedEvent === "All"
              ? "Are you sure you want to delete all events?"
              : "Are you sure you want to delete this event?"
          }`}
          onConfirm={
            deletedEvent === "All"
              ? handleDeletionAllDayEvents
              : handleDeletionDayEvent
          }
          onCancel={() => setConfirmation((prev) => !prev)}
        />
      )}
      {isFullList && (
        <FullEventList
          onClose={() => setIsFullList((prev) => !prev)}
          onCancel={() => setIsFullList((prev) => !prev)}
        />
      )}
      {addNewEvent && (
        <CalendarForm
          onCancel={() => setAddNewEvent((prev) => !prev)}
          onClose={() => setAddNewEvent((prev) => !prev)}
        />
      )}
      {!isFullList && !addNewEvent && (
        <>
          <div className="flex flex-col xl:flex-row gap-y-[0.5rem] gap-x-[1rem] xl:gap-[1.4rem] text-[2.5rem] xl:text-[4.5rem] text-[#ddd] pt-[4rem] xl:pt-[6rem] bg-[#111214] w-full justify-center xl:mb-[2rem] pb-[2rem] sticky z-5 top-0">
            <h1 className="font-bebas tracking-[0.1rem] text-center">
              {`Events scheduled for ${formateDate(calendarEvent.date)}`}
            </h1>
            <i className="bx bxs-calendar-edit self-center md:self-auto"></i>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[1rem] right-[-1.5rem] xl:top-[1.5rem] xl:right-[-3.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => setIsEventPresent((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <ul className="flex flex-col gap-y-[1.5rem] mb-[2rem] xl:mb-[4rem] px-[2rem] xl:px-[5rem] relative">
            {calendarEvent.dayAllEvents.map((event) => {
              return (
                <li
                  className="flex gap-[2rem] xl:gap-[10rem] bg-[rgba(255,255,255,0.1)] p-[0.8rem] xl:p-[1.5rem] rounded-[1rem] justify-center items-center shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-[0_6px_15px_rgba(0,0,0,0.3)]"
                  key={event.title}
                >
                  <div className="w-full">
                    <h2 className="font-bebas text-[2rem] xl:text-[3rem] text-[#ddd] border-b border-[rgba(255,255,255,0.3)]">
                      {event.title}
                    </h2>
                    <p className="text-[#bbb] text-[1.5rem] xl:text-[2rem]">
                      Time: {event.time}
                    </p>
                    {event.details && (
                      <p className="text-[1.5rem] xl:text-[2rem]">
                        Details: {event.details}
                      </p>
                    )}
                  </div>
                  <button
                    className="border-0 bg-transparent text-[2.4rem] xl:text-[2.6rem] text-[#cf1c1c] cursor-pointer transition-all ease-in-out duration-100 active:scale-85 delete-btn"
                    onClick={() => {
                      setConfirmation((prev) => !prev);
                      setDeletedEvent(event);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-center gap-x-[1.4rem] xl:gap-x-[6rem] mb-[2rem] xl:mb-[3rem]">
            <Button
              text={"Add a new event"}
              onAction={() => {
                setAddNewEvent((prev) => !prev);
              }}
              styles={
                "w-[12rem] px-[0.8rem] py-[0.6rem] md:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
              }
            />
            <Button
              text="Delete all events"
              onAction={() => {
                setConfirmation((prev) => !prev);
                setDeletedEvent("All");
              }}
              styles="w-[12rem] px-[0.8rem] py-[0.6rem] md:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
            />
          </div>
          <Button
            text="See full event list"
            onAction={() => {
              setIsFullList((prev) => !prev);
            }}
            styles="w-[14rem] px-[0.8rem] py-[0.6rem] md:w-[20rem] xl:px-[2rem] xl:py-[1rem] block mx-auto"
          />
        </>
      )}
    </>
  );
};

export default EventPresent;
