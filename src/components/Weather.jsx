import { useEffect, useState, useRef, useCallback } from "react";
import { BASE_URL_WEATHER } from "../constants";
import { API_KEY_WEATHER } from "../constants";
import { BASE_URL_CITY_COORDS } from "../constants";
import { initialCity } from "../constants";
import { weatherIcons } from "../constants";
import FetchError from "./FetchError";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [incorrectSearch, setInCorrectSearch] = useState(false);

  const inputRef = useRef(null);

  const fetchWeather = useCallback(
    (signal) => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError("");

          const cityToFetch = query === "" ? initialCity : query;
          const coordsRes = await fetch(
            `${BASE_URL_CITY_COORDS}?appid=${API_KEY_WEATHER}&q=${cityToFetch}`,
            signal ? { signal } : {}
          );

          if (!coordsRes.ok) {
            throw new Error("Failed to fetch coordinates.");
          }

          const coordsData = await coordsRes.json();

          if (!coordsData.length) {
            throw new Error("City not found. Please enter a valid city name.");
          }

          const { lon, lat } = coordsData[0];

          const weatherRes = await fetch(
            `${BASE_URL_WEATHER}?appid=${API_KEY_WEATHER}&lon=${lon}&lat=${lat}&units=metric`,
            signal ? { signal } : {}
          );

          if (!weatherRes.ok) {
            throw new Error(
              "Failed to fetch weather forecast. Please try to refresh the page"
            );
          }

          if (signal.aborted) return;

          const weatherData = await weatherRes.json();
          setWeatherData(weatherData);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    },
    [query]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setSearch("");
      inputRef.current.blur();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setSearch("");
      setInCorrectSearch((prev) => !prev);
      setTimeout(() => setInCorrectSearch((prev) => !prev), 800);
      return;
    }
    setQuery(search);
    setSearch("");
    inputRef.current.blur();
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchWeather(signal);

    return () => controller.abort();
  }, [fetchWeather]);

  return (
    <div className="w-full xl:min-w-[28rem] h-auto xl:h-[45%] bg-[#111214] rounded-[1rem] px-[1.5rem] py-[2rem] flex flex-col justify-center items-center gap-y-[2rem] lg:gap-y-[8rem] xl:gap-y-[2rem]">
      {isLoading && <Spinner />}
      {!isLoading && error && (
        <FetchError
          message={error}
          action={"Try Again"}
          onReload={() => {
            setError("");
            setSearch("");
            setQuery("");
            setIsLoading(true);
            fetchWeather();
          }}
        />
      )}
      {!isLoading && !error && (
        <>
          <div className="flex flex-col gap-y-[2rem] mt-[1rem]">
            <div className="flex justify-center items-center gap-x-[1rem] text-[3rem] text-[#ddd]">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="font-extrabold text-[3rem] text-[#ddd]"
              />
              <div className="font-comforta text-[2rem] font-bold text-[#fff]">
                {weatherData.name}
              </div>
            </div>
            <div className="relative mt-[1rem] xl:mt-[2rem]">
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    incorrectSearch ? "Enter something!" : "Enter Location"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  onKeyDown={handleKeyDown}
                  className={` ${
                    incorrectSearch
                      ? "pl-[0.5rem] focus:placeholder:text-[#b0bec5] animation-shake"
                      : "focus:placeholder:text-transparent"
                  } w-[28rem] xl:w-[clamp(15rem,14cqi,25rem)] h-[3.5rem] lg:h-[4rem] bg-transparent border-b-[0.1rem] border-[#aaa] pr-[6rem] pl-[2rem] text-[1.8rem] rounded-[1rem] placeholder:text-[1.5rem] placeholder:font-light outline-none transition-all duration-100 focus:border-[#00bfff] text-[#ddd] focus:shadow-[0_0_10px_rgba(0,191,255,0.5)]`}
                />
                <div className="absolute h-[4rem] top-1/2 right-[0.5rem] -translate-y-1/2 flex items-center justify-between gap-[1rem]">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setSearch("")}
                    className="border-0 bg-transparent text-[#bbb] cursor-pointer flex items-center justify-between"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-[2.6rem]" />
                  </button>
                  <button
                    className="border-0 bg-transparent text-[#bbb] cursor-pointer flex items-center justify-between"
                    type="submit"
                    onMouseDown={(e) => {
                      if (!search.trim()) {
                        setSearch("");
                        e.preventDefault();
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-[1.4rem] xl:text-[1.8rem]"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-[0.4rem] xl:gap-y-[0.6rem]">
            <i
              className={`${
                weatherIcons[weatherData.weather[0].main]
              } text-[8rem]`}
            ></i>
            <div className="font-comforta text-[2.5rem] text-[#ddd]">
              {weatherData.weather[0].main}
            </div>
            <div className="font-comforta text-[2.5rem] text-[#ddd]">
              {Math.round(Number(weatherData.main.temp))} °С
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
