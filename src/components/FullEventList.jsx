import Button from "./Button";
import { CalendarContext } from "./context/CalendarContext";
import { useContext } from "react";
import { formateDate } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { sortedDates } from "../utils/helpers";

const FullEventList = ({ onClose, onCancel }) => {
  const { calendarEvents, setCalendarEvent, setChosenDate } =
    useContext(CalendarContext);

  const handleViewEvents = (calendarEvent) => {
    setChosenDate(calendarEvent.date);
    setCalendarEvent(calendarEvent);
    onClose();
  };

  return (
    <>
      {calendarEvents.length === 0 && (
        <div className="flex gap-[1.4rem] text-[3rem] xl:text-[4.5rem] text-[#ddd] pt-[4rem] xl:pt-[6rem] bg-[#111214] w-full justify-center mb-[2rem] pb-[2rem] relative">
          <h1 className="font-bebas tracking-[0.1rem] text-center">
            No added events yet <i className="bx bxs-calendar-star"></i>
          </h1>
          <button
            className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[1rem] right-[-1.5rem] xl:top-[1.5rem] xl:right-[-3.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
            onClick={() => onCancel()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
      {calendarEvents.length !== 0 && (
        <>
          <div className="flex gap-[1.4rem] text-[3rem] xl:text-[4.5rem] text-[#ddd] pt-[4rem] xl:pt-[6rem] bg-[#111214] w-full justify-center mb-[1rem] xl:mb-[2rem] pb-[2rem] sticky z-5 top-0">
            <h1 className="font-bebas tracking-[0.1rem] text-center">
              All scheduled events
            </h1>
            <i className="bx bxs-calendar-star"></i>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[0.5rem] right-[-2rem] xl:top-[1.5rem] xl:right-[-3.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => onCancel()}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <ul className="px-[1rem] xl:px-[5rem]">
            {calendarEvents.sort(sortedDates).map((calendarEvent) => (
              <li
                className="flex justify-start items-center gap-x-[2rem] xl:gap-x-[4rem] mb-[1.5rem] border-b-[0.1rem] border-[#aaa] pb-[1rem]"
                key={calendarEvent.date}
              >
                <h2 className="text-[2rem] xl:text-[2.5rem] font-medium text-[#ddd] font-bebas">
                  {formateDate(calendarEvent.date)}
                </h2>
                <p className="text-[1.5rem] xl:text-[2rem] text-[#ddd] font-normal font-bebas">
                  Events: {calendarEvent.dayAllEvents.length}
                </p>
                <Button
                  text="View events"
                  onAction={() => handleViewEvents(calendarEvent)}
                  styles="ml-auto mr-[1rem] py-[0.4rem] px-[0.8rem]"
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FullEventList;
