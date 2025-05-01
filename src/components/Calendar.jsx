import { useState, useContext } from "react";
import { months } from "../constants";
import { daysOfWeek } from "../constants";
import NoEvents from "./NoEvents";
import EventPresent from "./EventPresent";
import Modal from "./Modal";
import { CalendarContext } from "./context/CalendarContext";

const Calendar = () => {
  const currDate = new Date();
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [confirmation, setConfirmation] = useState(false);
  const {
    isNoEvents,
    setIsNoEvents,
    isEventPresent,
    setIsEventPresent,
    calendarEvents,
    setCalendarEvent,
    setChosenDate,
  } = useContext(CalendarContext);

  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  const fillersNum = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handleCalendarEvent = (day) => {
    const chosenDate = `${day}.${currMonth + 1}.${currYear}`;
    setChosenDate(chosenDate);
    const calendarEvent = calendarEvents.find(
      (calendarEvent) => calendarEvent.date === chosenDate
    );
    if (calendarEvent) {
      setCalendarEvent(calendarEvent);
      setIsEventPresent((prev) => !prev);
    } else {
      setCalendarEvent(null);
      setIsNoEvents((prev) => !prev);
    }
  };

  const handlePreviousDate = () => {
    setCurrMonth((prev) => (currMonth === 0 ? 11 : prev - 1));
    setCurrYear((prev) => (currMonth === 0 ? prev - 1 : prev));
  };

  const handleNextDate = () => {
    setCurrMonth((prev) => (currMonth === 11 ? 0 : prev + 1));
    setCurrYear((prev) => (currMonth === 11 ? prev + 1 : prev));
  };
  return (
    <>
      <div className="w-full min-w-[28rem] h-auto xl:h-[calc(55%-2rem)] bg-[#111214] rounded-[1rem] p-[1.5rem] flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between gap-x-[1rem] pl-[1rem] mt-[1rem]">
          <h2 className="text-[2rem] text-[#bbb] font-light">
            {months[currMonth]},
          </h2>
          <h2 className="text-[2rem] text-[#bbb] font-light">{currYear}</h2>
          <div className="flex gap-x-[1rem] ml-auto">
            <button
              className="border-0 bg-transparent cursor-pointer"
              onClick={handlePreviousDate}
            >
              <i className="bx bx-chevron-left !flex items-center justify-center w-[3.5rem] h-[3.5rem] text-[2rem] bg-[#2c3542] text-[#b88efc] rounded-full"></i>
            </button>
            <button
              className="border-0 bg-transparent cursor-pointer"
              onClick={handleNextDate}
            >
              <i className="bx bx-chevron-right !flex items-center justify-center w-[3.5rem] h-[3.5rem] text-[2rem] bg-[#2c3542] text-[#b88efc] rounded-full"></i>
            </button>
          </div>
        </div>
        <div className="w-full flex mt-[2rem] mb-[1rem]">
          {daysOfWeek.map((el) => (
            <span
              className="flex justify-center items-center w-[calc(100%/7)] text-[1.4rem] font-light uppercase text-[#788793] tracking-[0.1rem]"
              key={el}
            >
              {el}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap w-full h-auto xl:h-[24rem] mb-[1rem]">
          {Array.from(
            {
              length: daysInMonth + fillersNum,
            },
            (_, i) => {
              if (i < fillersNum) {
                return (
                  <span
                    className="flex justify-center items-center gap-y-[0.1rem] text-[1.4rem] aspect-square text-[#bdd] w-[calc(100%/7)]"
                    key={i}
                  ></span>
                );
              } else {
                return (
                  <span
                    key={i}
                    className={`${
                      currDate.getDate() === i + 1 - fillersNum &&
                      currDate.getMonth() === currMonth &&
                      currDate.getFullYear() === currYear
                        ? "flex justify-center items-center text-[#fff] gap-y-[0.1rem] text-[2rem] aspect-square bg-linear-gradient rounded-full w-[calc(100%/7)] cursor-pointer"
                        : "flex justify-center items-center gap-y-[0.1rem] text-[1.4rem] aspect-square text-[#bdd] w-[calc(100%/7)] cursor-pointer"
                    }`}
                    onClick={() => handleCalendarEvent(i + 1 - fillersNum)}
                  >
                    {i + 1 - fillersNum}
                  </span>
                );
              }
            }
          )}
        </div>
      </div>
      {isNoEvents && (
        <Modal onClose={() => setIsNoEvents((prev) => !prev)}>
          <NoEvents />
        </Modal>
      )}
      {isEventPresent && (
        <Modal
          onClose={() => setIsEventPresent((prev) => !prev)}
          confirmation={confirmation}
        >
          <EventPresent
            setConfirmation={setConfirmation}
            confirmation={confirmation}
          />
        </Modal>
      )}
    </>
  );
};

export default Calendar;
