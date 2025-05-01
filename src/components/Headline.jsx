import noImg from "../assets/images/no-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
const Headline = ({
  headline,
  setChosenArticle,
  userBookmarks,
  setUserBookmarks,
}) => {
  const handleAddBookmark = () => {
    const isDuplicate = userBookmarks.some(
      (item) => item.title === headline.title
    );
    if (!isDuplicate) {
      const updatedBookmarks = [...userBookmarks, headline];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setUserBookmarks(updatedBookmarks);
    } else {
      const updatedBookmarks = [
        ...userBookmarks.filter((item) => item.title != headline.title),
      ];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setUserBookmarks(updatedBookmarks);
    }
  };

  const handleSetChosenArticle = (e) => {
    if (e.target.closest(".bookmark-btn")) {
      return;
    }
    setChosenArticle(headline);
  };

  return (
    <div
      className="w-full h-auto xl:h-[calc(50%-1rem)] bg-[#111214] rounded-[1rem] pt-[1rem] xl:pt-0 mb-[1rem] xl:mb-[0.5rem] relative text-[#fff] cursor-pointer"
      onClick={handleSetChosenArticle}
    >
      <img
        className="w-full h-full object-fit rounded-[1rem] opacity-50"
        src={headline.image || noImg}
        alt={headline.title}
      />
      <h2 className="w-full absolute bottom-0 left-0 py-[1rem] pl-[1rem] pr-[4rem] font-bebas text-[clamp(1.9rem,1.8cqi,3rem)] md:text-[4rem] xl:text-[clamp(1.9rem,1.8cqi,3rem)] tracking-[0.1rem] text-[#fff] bg-[rgba(0,0,0,0.7)] rounded-b-[1rem]">
        {headline.title}
        <button
          className="bookmark-btn text-[2.5rem] md:text-[4rem] xl:text-[2.5rem] absolute bottom-[1rem] right-[1.5rem] cursor-pointer border-0 bg-transparent text-[#fff]"
          onClick={handleAddBookmark}
        >
          <FontAwesomeIcon
            icon={
              userBookmarks.some((el) => el.title === headline.title)
                ? faBookmarkSolid
                : faBookmarkRegular
            }
          />
        </button>
      </h2>
    </div>
  );
};

export default Headline;
