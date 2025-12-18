import Headline from "./Headline";
import NewsGrid from "./NewsGrid";
import { useState, useEffect, useContext, useCallback } from "react";
import FetchError from "./FetchError";
import Spinner from "./Spinner";
import { API_KEY_NEWS } from "../constants/index";
import { BASE_URL_NEWS } from "../constants/index";
import NewsItemModal from "./NewsItemModal";
import Bookmarks from "./Bookmarks";
import Modal from "./Modal";
import { SearchContext } from "./context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chosenArticle, setChosenArticle] = useState(null);
  const [userBookmarks, setUserBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const { query, selectedCategory, setSelectedCategory } =
    useContext(SearchContext);

const fetchNews = useCallback(
  (signal) => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setNews([]);
        setError("");

        const params = new URLSearchParams({
          category: selectedCategory,
          lang: "en",
        });

        if (query) {
          params.append("q", query);
        }

        const response = await fetch(
          `/api/news?${params.toString()}`,
          signal ? { signal } : {}
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch news. Please try to refresh the page"
          );
        }

        const newsData = await response.json();
        const fetchedNews = newsData.articles;

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },
  [selectedCategory, query]
);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (selectedCategory !== "bookmarks" && selectedCategory !== null) {
      fetchNews(signal);
    }

    return () => controller.abort();
  }, [selectedCategory, fetchNews]);

  return (
    <div className="h-full bg-[#111214] pt-[1rem] xl:pt-0 rounded-[1rem] w-full xl:w-[clamp(30rem,43cqi,40%)]">
      {isLoading && <Spinner />}
      {!isLoading && error && (
        <FetchError
          message={error}
          action={"Refresh"}
          onReload={() => fetchNews()}
        />
      )}
      {!isLoading && !error && news.length > 0 && (
        <>
          <Headline
            headline={headline}
            setChosenArticle={setChosenArticle}
            userBookmarks={userBookmarks}
            setUserBookmarks={setUserBookmarks}
          />
          <NewsGrid
            news={news}
            setChosenArticle={setChosenArticle}
            userBookmarks={userBookmarks}
            setUserBookmarks={setUserBookmarks}
          />
          {chosenArticle && (
            <Modal onClose={() => setChosenArticle(null)}>
              <NewsItemModal
                chosenArticle={chosenArticle}
                onClose={() => setChosenArticle(null)}
              />
            </Modal>
          )}
        </>
      )}
      {selectedCategory === "bookmarks" && (
        <Bookmarks
          userBookmarks={userBookmarks}
          setUserBookmarks={setUserBookmarks}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {!isLoading && !error && news.length === 0 && (
        <div className="bg-[#111214] p-[1rem] rounded-[1rem] font-bold text-center text-[1.5rem] min-h-[50vh] xl:text-[3rem] w-full h-full flex flex-col items-center justify-center gap-[1rem]">
          No results were found for your search
          <FontAwesomeIcon icon={faFaceMeh} className="text-[4rem]" />
        </div>
      )}
    </div>
  );
};

export default News;
