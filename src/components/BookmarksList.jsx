import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const BookmarksList = ({
  userBookmarks,
  handleConfirmation,
  setBookmarkedChosenArticle,
}) => {
  return (
    <ul className="flex flex-col gap-[1rem] xl:gap-[2rem] px-[1rem] xl:px-[4rem]">
      {userBookmarks.map((el) => {
        return (
          <li
            className="flex justify-between items-start gap-x-[1rem] xl:gap-x-[1.8rem] cursor-pointer"
            key={el.title}
            onClick={(e) => {
              if (!e.target.closest(".delete-btn"))
                setBookmarkedChosenArticle(el);
            }}
          >
            <img
              className="w-[7rem] h-[7rem] object-cover rounded-[0.8rem] mr-[1rem]"
              src={el.image}
              alt={el.title}
            />
            <h3 className="font-comforta text-[1.1rem] md:text-[1.8rem] font-bold text-[#fff]">
              {el.title}
            </h3>
            <button
              className="border-0 bg-transparent text-[2.4rem] xl:text-[2.6rem] text-[#cf1c1c] cursor-pointer transition-all ease-in-out duration-100 active:scale-85 delete-btn"
              onClick={() => handleConfirmation(el)}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default BookmarksList;
