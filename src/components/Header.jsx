import { initialCategory } from "../constants";
import { useRef, useState, useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [incorrectSearch, setInCorrectSearch] = useState(false);
  const { setQuery, search, setSearch, setSelectedCategory } =
    useContext(SearchContext);

  const inputRef = useRef(null);

  const HandleHomePage = (e) => {
    e.preventDefault();
    setSelectedCategory(initialCategory);
    setSearch("");
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setSearch("");
      setInCorrectSearch((prev) => !prev);
      setTimeout(() => setInCorrectSearch((prev) => !prev), 1000);
      return;
    }
    setQuery(search);
    setSearch("");
    inputRef.current.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setSearch("");
      inputRef.current.blur();
    }
  };

  return (
    <header className="flex justify-between gap-x-[1.5rem] items-center w-full bg-[#111214] xl:min-h-[7rem] px-[2rem]  pt-[2rem] pb-[1rem] xl: xl:px-[4rem] rounded-t-[1rem]">
      <h1 className="text-[3rem] md:text-[5rem] text-[#ddd] font-bebas tracking-[0.2rem] font-semibold leading-none [text-shadow:0_0_5px_#888]">
        <a href="#" onClick={HandleHomePage}>
          News & Blogs
        </a>
      </h1>
      <div className="relative flex-1 xl:flex-0">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder={
              incorrectSearch ? "Enter something!" : "Search news..."
            }
            value={search}
            onKeyDown={handleKeyDown}
            className={`${
              incorrectSearch
                ? "pl-[0.5rem] focus:placeholder:text-[#b0bec5] animation-shake"
                : "focus:placeholder:text-transparent"
            }
            w-full md:ml-auto xl:ml-0 block md:w-[30rem] xl:w-[25rem] h-[3.5rem] md:h-[4rem] bg-[#060709] border-0 rounded-full pr-[7rem] pl-[2rem] text-[#ddd] text-[1.8rem] transition-all duration-300 md:focus:w-[40rem] xl:focus:w-[35rem] focus:border-b-[0.1rem] focus:border-[#00bfff] focus:shadow-[0_0_10px_rgba(0,191,255,0.5)] focus:placeholder:font-comforta placeholder:text-[1.2rem] md:placeholder:text-[2rem] xl:placeholder:text-[1.5rem] placeholder:font-light outline-none`}
          />
          <div className="absolute h-[3.5rem] xl:h-[4rem] top-1/2 right-[1rem] -translate-y-1/2 flex text-[#bbb] items-center justify-between gap-[1rem]">
            <button
              className="bg-transparent border-0 flex items-center justify-center cursor-pointer"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSearch("");
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-[2rem] md:text-[2.4rem] xl:text-[2.6rem]"
              />
            </button>
            <button
              className="bg-transparent border-0 flex items-center justify-center cursor-pointer"
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
                className="text-[1.4rem] md:text-[1.6rem] xl:text-[1.8rem]"
              />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
