import userImg from "../assets/images/user.jpg";
import { categories } from "../constants";
import { useState, useContext } from "react";
import AddNewPost from "./AddNewPost";
import Modal from "./Modal";
import Button from "./Button";
import { SearchContext } from "./context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ posts, setPosts }) => {
  const [addNewPost, setAddNewPost] = useState(false);
  const { setQuery, setSearch, selectedCategory, setSelectedCategory } =
    useContext(SearchContext);

  return (
    <>
      {addNewPost && (
        <Modal onClose={() => setAddNewPost((prev) => !prev)}>
          <AddNewPost
            posts={posts}
            setPosts={setPosts}
            onClose={() => setAddNewPost((prev) => !prev)}
          />
        </Modal>
      )}
      <div className="w-full xl:w-[18rem] h-full flex flex-col gap-y-[2rem]">
        <div className="w-full xl:h-[22%] bg-[#111214] px-[2rem] xl:px-0 flex flex-col justify-center items-center pb-[1rem] pt-[1rem] xl:pb-[0.5rem] gap-y-[0.8rem] text-[2.5rem] rounded-[1rem]">
          <img
            src={userImg}
            className="w-[7rem] xl:w-[7rem] md:w-[15rem] aspect-[1] object-cover rounded-full"
            alt="User Img"
          />
          <p className="font-comforta text-[1.5rem] md:text-[2rem] xl:text-[1.5rem] text-[#ddd]">
            Alex's Blog
          </p>
          <Button
            text="New Post"
            onAction={() => setAddNewPost((prev) => !prev)}
            styles="px-[1.2rem] py-[0.1rem] xl:!text-[1.8rem] md:text-[2.5rem] xl:!text-[1.8rem]"
          >
            <i className="bx bx-image-add"></i>
          </Button>
        </div>
        <nav className="w-full bg-[#111214] rounded-[1rem] flex flex-col xl:gap-y-[2rem] p-[1rem] xl:p-[2rem] h-[calc(78%-2rem)]">
          <h1 className="font-bebas text-[2.4rem] text-center xl:text-left xl:text-[clamp(1.5rem,2.5cqi,3rem)] font-semibold md:text-[3rem] text-[#ddd] tracking-[0.2rem] mb-[1rem]">
            Categories
          </h1>
          <ul className="flex flex-wrap xl:flex-col gap-[2rem] xl:justify-normal xl:items-stretch justify-center items-center lg:max-w-[80%] lg:self-center xl:self-auto xl:max-w-full">
            {categories.map((category, index) => {
              return categories.length - 1 !== index ? (
                <li
                  className="flex items-center tracking-[0.1rem] text-[#ddd] text-[1.2rem] md:text-[1.8rem] xl:text-[1.5rem] font-light uppercase hover:text-[#fff]"
                  key={category}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(category.toLowerCase());
                      setQuery("");
                      setSearch("");
                    }}
                    className={`${
                      selectedCategory === category.toLowerCase()
                        ? "text-[#fff] rounded-lg px-[0.4rem] py-[0.2rem] xl:p-0 bg-[#3a3b3c] text-[1.4rem] md:text-[1.7rem] xl:bg-transparent"
                        : ""
                    }`}
                  >
                    {category}
                  </a>
                </li>
              ) : (
                <li
                  className="flex items-center tracking-[0.1rem] text-[#ddd] text-[1.2rem] md:text-[1.8rem] xl:text-[1.5rem] font-light uppercase hover:text-[#fff]"
                  key={category}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(category.toLowerCase());
                      setQuery("");
                      setSearch("");
                    }}
                    className={`${
                      selectedCategory === category.toLowerCase()
                        ? "text-[#fff] rounded-lg px-[0.4rem] py-[0.2rem] xl:p-0 bg-[#3a3b3c] text-[1.4rem] xl:text-[1.7rem] xl:bg-transparent"
                        : ""
                    }`}
                  >
                    {category}{" "}
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="text-[1.2rem] ml-[0.4rem] xl:text-[1.5rem] xl:ml-[1rem]"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
