import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, children, heading, confirmation }) => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const modalEl = useRef(null);

  const checkScroll = () => {
    if (modalEl.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalEl.current;
      setShowScrollBtn(scrollHeight > clientHeight && scrollTop > 0);
    }
  };

  const scrollToTop = () => {
    if (modalEl.current) {
      modalEl.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const modal = modalEl.current;

    if (modal) {
      modal.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (modal) {
        modal.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  useEffect(() => {
    function handleModal(e) {
      if (
        !modalEl.current ||
        modalEl.current.contains(e.target) ||
        confirmation
      )
        return;
      onClose();
    }

    function handleKeyDown(e) {
      if (e.key === "Escape" && !confirmation) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleModal);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleModal);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, confirmation]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
      <div
        className="bg-[#111214] relative rounded-[1rem] shadow-[0_0_50px_40px_rgba(0,0,0,0.5)] max-h-[90vh] xl:max-h-[80vh] overflow-auto h-auto px-[2rem] xl:px-[5rem] pb-[1rem] md:pb-[4rem] scrollbar-w-4 scrollbar-thumb w-[90%] md:max-w-[94rem] xl:max-w-[70rem] scrollbar-hide"
        ref={modalEl}
      >
        {showScrollBtn && (
          <button
            className="cursor-pointer hidden md:inline-flex justify-center items-center transition-all ease-in-out duration-100 rounded-full p-[1.5rem] text-[1.6rem] text-[#fff] bg-transparent border border-white active:scale-85 fixed left-1/2 -translate-x-1/2 bottom-[2.6rem] hover:text-[#000] hover:bg-[#fff]"
            onClick={() => scrollToTop()}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
        {heading && (
          <div className="pt-[3rem] xl:pt-[6rem] mb-[2rem] sticky z-5 top-0 pb-[2rem] bg-[#111214] w-full">
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] right-[-0.5rem] top-[2rem] xl:top-[2rem] xl:right-[-3rem] w-[2rem] h-[2rem] xl:w-[4.4rem] xl:h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => {
                onClose();
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className="font-bebas tracking-[0.1rem] text-[#ddd] font-light text-[3rem] xl:text-[4.5rem] text-center flex gap-x-[1.4rem] justify-center">
              {heading}
            </h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
