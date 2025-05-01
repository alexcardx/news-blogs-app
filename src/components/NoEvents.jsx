import { useState } from "react";
import CalendarForm from "./CalendarForm";
import FullEventList from "./FullEventList";
import Button from "./Button";
import { useContext } from "react";
import { CalendarContext } from "./context/CalendarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NoEvents = () => {
  const [isCalendarForm, setIsCalendarForm] = useState(false);
  const [isFullList, setIsFullList] = useState(false);
  const { setIsNoEvents, setIsEventPresent } = useContext(CalendarContext);

  const handleViewAll = () => {
    setIsNoEvents((prev) => !prev);
    setIsEventPresent((prev) => !prev);
  };

  return (
    <>
      {isCalendarForm && (
        <CalendarForm
          onCancel={() => setIsCalendarForm((prev) => !prev)}
          onClose={() => {
            setIsNoEvents((prev) => !prev);
            setIsEventPresent((prev) => !prev);
          }}
        />
      )}
      {isFullList && (
        <FullEventList
          onClose={handleViewAll}
          onCancel={() => setIsFullList((prev) => !prev)}
        />
      )}
      {isCalendarForm || isFullList || (
        <>
          <div className="flex justify-center gap-[1.4rem] text-[3rem] xl:text-[4.5rem] text-[#ddd] pt-[4rem] xl:pt-[6rem] bg-[#111214] relative w-full">
            <h1 className="font-bebas font-light tracking-[0.1rem] text-center">
              No scheduled events for this date
              <i className="bx bxs-calendar-edit ml-[1rem]"></i>
            </h1>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[1rem] right-[-1.5rem] xl:top-[1.5rem] xl:right-[-3.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => setIsNoEvents((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex justify-center items-center gap-[2rem] xl:gap-[4rem] mt-[2rem] xl:mt-[3rem] pb-[2rem] xl:pb-0">
            <Button
              text="Add a new event"
              onAction={() => setIsCalendarForm((prev) => !prev)}
              styles="w-[14rem] md:w-[20rem] xl:w-[14rem] px-[1.6rem] py-[0.8rem] xl:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
            />
            <Button
              text="See full event list"
              onAction={() => setIsFullList((prev) => !prev)}
              styles="w-[14rem] md:w-[20rem] xl:w-[14rem] px-[1.6rem] py-[0.8rem] xl:w-[20rem] xl:px-[2rem] xl:py-[1rem]"
            />
          </div>
        </>
      )}
    </>
  );
};

export default NoEvents;
