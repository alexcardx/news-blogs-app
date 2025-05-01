import NewsItem from "./NewsItem";

const NewsGrid = ({
  news,
  setChosenArticle,
  userBookmarks,
  setUserBookmarks,
}) => {
  return (
    <div className="w-full xl:h-1/2 xl-mt-0 bg-[#111214] rounded-[1rem] grid grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-[1rem] px-[1.2rem] pt-[1.2rem] pb-[0.5rem] justify-items-center items-center">
      {news.map((article) => (
        <NewsItem
          setChosenArticle={setChosenArticle}
          article={article}
          key={article.title}
          userBookmarks={userBookmarks}
          setUserBookmarks={setUserBookmarks}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
