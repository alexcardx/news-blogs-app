import noImg from "../assets/images/no-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

const NewsItem = ({
  article,
  setChosenArticle,
  userBookmarks,
  setUserBookmarks,
}) => {
  const handleAddBookmark = () => {
    const isDuplicate = userBookmarks.some(
      (item) => item.title === article.title
    );
    if (!isDuplicate) {
      const updatedBookmarks = [...userBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setUserBookmarks(updatedBookmarks);
    } else {
      const updatedBookmarks = [
        ...userBookmarks.filter((item) => item.title != article.title),
      ];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setUserBookmarks(updatedBookmarks);
    }
  };

  const handleSetChosenArticle = (e) => {
    if (e.target.closest(".bookmark-btn")) {
      return;
    }
    setChosenArticle(article);
  };

  return (
    <div
      className="w-full h-[11rem] xl:h-full min-h-[12rem] md:min-h-[25rem] xl:min-h-[15rem] rounded-[1rem] relative text-[#fff] cursor-pointer"
      onClick={handleSetChosenArticle}
    >
      <img
        src={article.image || noImg}
        alt={article.title}
        className="w-full h-full block object-cover rounded-[1rem]"
      />
      <h3 className="absolute bottom-0 left-0 min-h-[5rem] md:min-h-[8rem] xl:min-h-[5rem] xl:h-auto text-[1.5rem] pt-[1rem] xl:py-[1rem] pr-[3rem] pl-[1rem] font-bebas md:text-[3rem] xl:text-[1.6rem] leading-[1.4rem] md:leading-[3rem] xl:leading-[1.8rem] bg-[rgba(0,0,0,0.7)] w-full rounded-b-[1rem] font-light">
        {article.title.length > 50
          ? article.title.slice(0, 50) + "..."
          : article.title}
        <button
          className="bookmark-btn text-[1.8rem] md:text-[2.5rem] xl:text-[1.8rem] absolute bottom-[1rem] right-[1rem] cursor-pointer border-0 bg-transparent text-[#fff]"
          onClick={handleAddBookmark}
        >
          <FontAwesomeIcon
            icon={
              userBookmarks.some((el) => el.title === article.title)
                ? faBookmarkSolid
                : faBookmarkRegular
            }
          />
        </button>
      </h3>
    </div>
  );
};

export default NewsItem;
