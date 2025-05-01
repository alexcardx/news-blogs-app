import noImg from "../assets/images/no-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MyBlogModal = ({ chosenBlog, onClose }) => {
  return (
    <div className="pt-[4rem] relative">
      <button
        className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] top-[0.4rem] right-[-2rem] xl:top-[0.8rem] xl:right-[-4.2rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
        onClick={() => onClose()}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <img
        src={chosenBlog.img || noImg}
        alt={chosenBlog.title}
        className="w-full h-auto object-cover max-h-[30rem] rounded-[1rem] opacity-50 m-auto"
      />
      <h1 className="font-bebas text-[2rem] md:text-[4rem] xl:text-[2rem] text-[#fff] tracking-[0.15rem] mt-[2rem] font-bold">
        {chosenBlog.title}
      </h1>
      <p className="w-full text-[1.6rem] md:text-[2.5rem]  xl:text-[1.6rem] leading-[2.7rem] text-[#ddd] max-h-[28rem] overflow-auto border-b border-[#504f4f] rounded-[0.5rem] scrollbar-w-4 scrollbar-thumb">
        {chosenBlog.details}
      </p>
    </div>
  );
};

export default MyBlogModal;
