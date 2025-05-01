import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteConfirmation = ({ title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50">
      <div className="bg-[#111214] p-[2rem] rounded-[1rem] w-[90%] max-w-[40rem] shadow-[0_10px_25px_tgba(0,0,0,0.6)] text-center relative">
        <h2 className="mb-[1rem] text-[2rem] text-[#ddd]">{title}</h2>
        <p className="mb-[2rem]">{message}</p>
        <div className="flex justify-center items-center gap-[4rem] xl:gap-[6rem] text-[#111214]">
          <button
            className="bg-[#d9534f] text-[1.6rem] px-[2rem] py-[0.8rem] border-0 rounded-[0.5rem] cursor-pointer hover:bg-[#c9302c]"
            onClick={() => onConfirm()}
          >
            Delete
          </button>
          <button
            className="bg-[#ccc] text-[1.6rem] px-[2rem] py-[0.8rem] border-0 rounded-[0.5rem] cursor-pointer hover:bg-[#b0b0b0]"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] top-[0.5rem] right-[0.5rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
            onClick={() => onCancel()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
