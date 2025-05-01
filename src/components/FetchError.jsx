import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const FetchError = ({ message, action, onReload }) => {
  return (
    <div className="text-[#d9534f] bg-[#111214] p-[1rem] rounded-[1rem] font-bold text-center text-[1.5rem] md:text-[2rem] w-full h-full flex items-center justify-center flex-col gap-[0.5rem] xl:gap-[1.5rem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="text-[#111214] bg-[#d9534f] rounded-full text-[2rem] xl:text-[4rem] p-[0.2rem] xl:p-[0.5rem]"
      />
      <p>{message}</p>
      <button
        className="bg-[#d9534f] tracking-[0.1rem] text-[#fff] border-0 py-[0.rem] xl:py-[1rem] px-[1.5rem] xl:px-[5rem] text-[1.5rem] xl:text-[1.5rem] rounded-[2rem] cursor-pointer transition-all duration-300 transform ease-in-out hover:bg-[#c9302c] hover:scale-105 active:bg-[#d9534f] active:scale-95 font-light xl:font-normal"
        onClick={onReload}
      >
        {action}
      </button>
    </div>
  );
};

export default FetchError;
