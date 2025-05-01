import noImg from "../assets/images/no-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NewsItemModal = ({ chosenArticle, onClose }) => {
  const formattedDate = new Date(chosenArticle.publishedAt).toLocaleDateString(
    "ru-Ru",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <div className="pt-[4rem] relative">
      <button
        className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] top-[0.4rem] right-[-2rem] xl:text-[4rem] xl:top-[0.8rem] xl:right-[-4rem] w-[4.4rem] h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
        onClick={() => onClose()}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <img
        src={chosenArticle.image || noImg}
        alt={chosenArticle.title}
        className="w-full h-auto max-h-[30rem] object-cover rounded-[1rem] opacity-50"
      />
      <h2 className="font-bebas text-[2rem] lg:text-[4rem] xl:text-[2rem] text-[#fff] tracking-[0.15rem] mt-[2rem]">
        {chosenArticle.title}
      </h2>
      <p className="font-comforta text-[1.6rem] md:text-[2.5rem] xl:text-[1.6rem] text-[#bbb] mt-[1rem]">
        Source: {chosenArticle.source.name}
      </p>
      <p className="font-comforta text-[1.6rem] md:text-[2.5rem] xl:text-[1.6rem] text-[#bbb] mt-[1rem]">
        {formattedDate}
      </p>
      <p className="text-[1.6rem] md:text-[2.5rem] xl:text-[1.6rem] text-[#ddd] mt-[1.5rem] mb-[2.5rem] leading-[2.7rem]">
        {chosenArticle.content}
      </p>
      <a
        rel="stylesheet"
        href={chosenArticle.url}
        className="w-[15rem] block py-[1rem] px-[2rem] text-[1.6rem] text-[#fff] rounded-[5rem] uppercase tracking-[0.1rem] m-auto text-center bg-linear-gradient active:translate-0.5"
        target="_blank"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsItemModal;
