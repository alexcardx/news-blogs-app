import { useState } from "react";
import noImg from "../assets/images/no-img.png";
import user from "../assets/images/user.jpg";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSurprise } from "@fortawesome/free-solid-svg-icons";

const AddNewPost = ({ onClose, setPosts, posts, chosenPost }) => {
  const [postTitle, setPostTitle] = useState(chosenPost?.title || "");
  const [postDetails, setPostDetails] = useState(chosenPost?.details || "");
  const [isPostAdded, setIsPostAdded] = useState(false);
  const [postImg, setPostImg] = useState(chosenPost?.img || null);

  const handlePostImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPostImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chosenPost) {
      const changedPost = {
        img: postImg || noImg,
        title: postTitle,
        details: postDetails,
        id: chosenPost.id,
      };
      const updatedPosts = [
        ...posts.filter((post) => post.id !== chosenPost.id),
        changedPost,
      ];
      setPosts(updatedPosts);
      setIsPostAdded((prev) => !prev);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      const newPost = {
        img: postImg || noImg,
        title: postTitle,
        details: postDetails,
        id: Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      };
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      setIsPostAdded((prev) => !prev);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  return (
    <>
      {isPostAdded ? (
        <>
          <div className="flex justify-center gap-[1.4rem] text-[2.4rem] xl:text-[4.5rem] text-[#ddd] pt-[4rem] xl:pt-[6rem] bg-[#111214] relative w-full">
            <h1 className="font-bold text-center">
              {chosenPost ? "Post has been changed" : "Post has been published"}
              {""}
              <i className="bx bxs-badge-check ml-2 xl:ml-[1.4rem]"></i>
            </h1>
            <button
              className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] right-[-0.5rem] top-[2rem] xl:top-[2rem] xl:right-[-3rem] w-[2rem] h-[2rem] xl:w-[4.4rem] xl:h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <Button
            text={"Close"}
            onAction={onClose}
            styles={
              "xl:px-[3rem] xl:py-[1rem] px-[2rem] py-[0.5rem] w-[11rem] xl:w-[14rem] mt-[1rem] xl:mt-[2rem] block m-auto"
            }
          />
        </>
      ) : (
        isPostAdded || (
          <>
            <div className="flex gap-[1.4rem] text-[3.4rem] text-center xl:text-left xl:text-[4.5rem] text-[#ddd] pt-[4rem] px-[2rem] xl:pt-[6rem] bg-[#111214] relative w-full">
              <h1 className="font-bebas tracking-[0.1rem]">
                {chosenPost ? "Changing a post" : "Adding a new Post"}
              </h1>
              <FontAwesomeIcon icon={faFaceSurprise} />
              <button
                className="absolute text-[#fff] cursor-pointer bg-transparent border-0 text-[3rem] xl:text-[4rem] right-[-0.5rem] top-[2rem] xl:top-[2rem] xl:right-[-3rem] w-[2rem] h-[2rem] xl:w-[4.4rem] xl:h-[4.4rem] hover:rounded-full hover:bg-[rgba(255,255,255,0.8)] hover:text-[#000] flex items-center justify-center"
                onClick={() => onClose()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <form
              className="flex flex-col justify-center py-[2rem] gap-y-[2rem] px-[2rem]"
              onSubmit={handleSubmit}
            >
              <div className="border-b-[0.1rem] border-[#bbb] w-[90%] xl:w-[40%] rounded-[1rem] p-[1rem] mb-[1rem]">
                <label
                  htmlFor="file-upload"
                  className="flex items-end gap-x-[2rem] text-[1.8rem] xl:text-[2rem] text-[#bbb] cursor-pointer"
                >
                  <i className="bx bx-upload text-[3rem] xl:text-[4rem] text-[#b88efc]"></i>
                  Upload image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handlePostImgChange}
                />
              </div>
              <input
                type="text"
                placeholder="Blog Title"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.currentTarget.value)}
                className="w-[90%] h-[4rem] border-0 bg-transparent border-b-[0.1rem] border-[#aaa] text-[#ddd] py-[0.5rem] pr-[4rem] pl-[1rem] text-[2rem] rounded-[1rem] tracking-all ease-in-out duration-100 focus:border-[0.1rem] focus:border-[#aaa] focus:placeholder:text-transparent outline-none focus:shadow-[0_4px_10px_rgba(166,117,245,0.3)]"
              />
              <textarea
                placeholder="Details"
                value={postDetails}
                onChange={(e) => setPostDetails(e.currentTarget.value)}
                className="bg-transparent border-1 border-[#808080] text-[#ddd] text-[2rem] w-[90%] h-[25rem] xl:h-[20rem] rounded-[2rem] resize-none py-[0.5rem] pr-[4rem] pl-[1rem] focus:shadow-[0_4px_10px_rgba(166,117,245,0.3)]  focus:placeholder:text-transparent outline-0 scrollbar-w-4 scrollbar-thumb"
              />
              <div className="flex gap-x-[2rem] xl:gap-x-[3rem] items-center">
                <Button
                  text="Add"
                  styles="px-[3rem] py-[1rem] w-[11rem] xl:w-[14rem] mt-[0.5rem] xl:mt-[1rem]"
                />
                <Button
                  text="Cancel"
                  styles="px-[3rem] py-[1rem] w-[11rem] xl:w-[14rem] mt-[0.5rem] xl:mt-[1rem]"
                  type="button"
                  onAction={onClose}
                />
              </div>
              <img
                className="w-[14rem] aspect-square object-cover rounded-full hidden xl:block xl:absolute top-[6rem] left-[45rem] border-[0.4rem] border-[#753bd3] shadow-[0_0_15px_#551caf]"
                src={user}
                alt="user img"
              />
            </form>
          </>
        )
      )}
    </>
  );
};

export default AddNewPost;
