import { useState, useContext } from "react";
import Button from "./Button";
import { CalendarContext } from "./context/CalendarContext";
import { formateDate } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CalendarForm = ({ onCancel, onClose }) => {
  const [eventTime, setEventTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [isEventAdded, setIsEventAdded] = useState(false);
  const [isDuplicatedName, setIsDuplicatedName] = useState(false);
  const {
    calendarEvents,
    setCalendarEvents,
    calendarEvent,
    setCalendarEvent,
    chosenDate,
  } = useContext(CalendarContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!calendarEvent) {
      const newCalendarEvent = {
        date: chosenDate,
        dayAllEvents: [
          { title: eventName, time: eventTime, details: eventDetails },
        ],
      };
      const updatedCalendarEvents = [...calendarEvents, newCalendarEvent];
      setCalendarEvent(newCalendarEvent);
      setCalendarEvents(updatedCalendarEvents);
      localStorage.setItem(
        "calendarEvents",
        JSON.stringify(updatedCalendarEvents)
      );
      setIsEventAdded((prev) => !prev);
      return;
    } else {
      function calculateUpdatedCalendarEvent() {
        const duplicatedNameEvent = calendarEvent.dayAllEvents.find(
          (el) => el.title === eventName
        );
        if (duplicatedNameEvent) {
          setIsDuplicatedName((prev) => !prev);
          setEventName("");
          setTimeout(() => setIsDuplicatedName((prev) => !prev), 1000);
          return;
        } else {
          return {
            ...calendarEvent,
            dayAllEvents: [
              ...calendarEvent.dayAllEvents,
              { title: eventName, time: eventTime, details: eventDetails },
            ],
          };
        }
      }

      const updatedCalendarEvent = calculateUpdatedCalendarEvent();
      if (updatedCalendarEvent) {
        const updatedCalendarEvents = [
          ...calendarEvents.filter(
            (calendarEvent) => calendarEvent.date !== chosenDate
          ),
          updatedCalendarEvent,
        ];

        setCalendarEvent(updatedCalendarEvent);
        setCalendarEvents(updatedCalendarEvents);
        localStorage.setItem(
          "calendarEvents",
          JSON.stringify(updatedCalendarEvents)
        );

        setIsEventAdded((prev) => !prev);
      }
    }
  };

  return (
    <>
      {isEventAdded ? (
        <>
          <div className="flex justify-center items-center gap-[0.5rem] xl:gap-[1.4rem] text-[3rem] xl:text-[4.5rem] text-[#ddd] pt-[2rem] xl:pt-[4rem] bg-[#111214] relative w-full">
            <h1 className="font-bold tracking-[0.1rem] text-center">Done</h1>
            <i className="bx bxs-badge-check"></i>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[1rem] right-[-1.5rem] xl:top-[1.5rem] xl:right-[-3.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <Button
            text={"Close"}
            onAction={onClose}
            styles={
              "xl:px-[2.5rem] xl:py-[0.6rem] px-[0.5rem] py-[0.5rem] w-[10rem] xl:w-[14rem] block mt-[1rem] xl:mt-[2rem] m-auto"
            }
          />
        </>
      ) : (
        <div className="text-[#ddd] px-[2rem] xl:px-[6rem]">
          <div className="flex gap-[1.4rem] text-[3rem] xl:text-[4.5rem] text-[#ddd] pt-[6rem] bg-[#111214] relative w-full">
            <h1 className="font-bebas tracking-[0.1rem]">Adding a new Event</h1>
            <i className="bx bx-calendar-plus"></i>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] top-[0.8rem] right-[-3.5rem] xl:text-[4rem] xl:top-[2rem] xl:right-[-8rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => onCancel()}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <p className="font-bebas text-[2.2rem] ml-[0.5rem] mt-[2rem] xl:mt-[4rem]">
            Date: {formateDate(chosenDate)}
          </p>
          <form
            className="flex flex-col justify-center pt-[1rem] pb-[2rem] xl:py-[2rem] gap-y-[2rem]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder={`${
                isDuplicatedName ? "Such an event already exists!" : "Event"
              }`}
              required
              value={eventName}
              onChange={(e) => setEventName(e.currentTarget.value)}
              className={`${
                isDuplicatedName
                  ? "animation-shake focus:placeholder:pl-[0.5rem] focus:placeholder:text-[#b0bec5]"
                  : ""
              } w-[90%] h-[4rem] border-0 bg-transparent border-b-[0.1rem] border-[#aaa] text-[#ddd] py-[0.5rem] pr-[4rem] pl-[1rem] text-[2rem] rounded-[1rem] tracking-all ease-in-out duration-100 focus:border-[0.1rem] focus:border-[#aaa] focus:placeholder:text-transparent outline-none focus:shadow-[0_4px_10px_rgba(166,117,245,0.3)]`}
            />
            <input
              type="time"
              placeholder="HH:MM"
              value={eventTime}
              required
              onChange={(e) => setEventTime(e.currentTarget.value)}
              className="w-[90%] h-[4rem] border-0 bg-transparent border-b-[0.1rem] border-[#aaa] text-[#ddd] py-[0.5rem] pr-[4rem] pl-[1rem] text-[2rem] rounded-[1rem] tracking-all ease-in-out duration-100 focus:border-[0.1rem] focus:border-[#aaa] focus:placeholder:text-transparent outline-none focus:shadow-[0_4px_10px_rgba(166,117,245,0.3)]"
            />
            <textarea
              placeholder="Details"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.currentTarget.value)}
              className="bg-transparent border-1 border-[#808080] text-[#ddd] text-[2rem] w-[90%] h-[20rem] rounded-[1rem] resize-none py-[0.5rem] pr-[4rem] pl-[1rem] focus:shadow-[0_4px_10px_rgba(166,117,245,0.3)]  focus:placeholder:text-transparent outline-0 scrollbar-w-4 scrollbar-thumb"
            />
            <div className="flex gap-x-[2rem] xl:gap-x-[3rem] items-center">
              <Button
                text="Add"
                styles="w-[10rem] px-[0.8rem] py-[0.6rem] xl:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
              />
              <Button
                text="Cancel"
                styles="w-[10rem] px-[0.8rem] py-[0.6rem] xl:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
                onAction={onCancel}
                type="button"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CalendarForm;
