import { useState } from "react";
import AddNewPost from "./AddNewPost";
import DeleteConfirmation from "./DeleteConfirmation";
import MyBlogModal from "./MyBlogModal";
import Modal from "./Modal";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";

const MyBlog = ({ posts, setPosts }) => {
  const [newPostForm, setNewPostForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [deletedPost, setDeletedPost] = useState(null);
  const [chosenPost, setChosenPost] = useState(null);

  const handleDeletionPost = () => {
    const updatedPosts = [...posts.filter((el) => el.id !== deletedPost.id)];
    setPosts(updatedPosts);
    setChosenPost(null);
    setConfirmation((prev) => !prev);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="w-full xl:w-[clamp(20rem,27cqi,28%)] xl:max-h-full max-h-[70vh] bg-[#111214] rounded-[1rem] pb-[2rem] ">
      {!confirmation && !newPostForm && chosenPost && (
        <Modal onClose={() => setChosenPost(null)}>
          <MyBlogModal
            chosenBlog={chosenPost}
            onClose={() => setChosenPost(null)}
          />
        </Modal>
      )}
      {confirmation && (
        <DeleteConfirmation
          title="Delete Confirmation"
          message="Are you sure you want to delete this post?"
          onConfirm={handleDeletionPost}
          onCancel={() => {
            setChosenPost(null);
            setConfirmation((prev) => !prev);
          }}
        />
      )}
      {posts.length === 0 && !newPostForm && (
        <div className="flex flex-col items-center justify-center w-full h-full p-[5rem]">
          <h1 className="font-bebas text-[4.5rem] font-light text-[#ddd] tracking-[0.1rem] text-center">
            You haven't published any post so far
            <FontAwesomeIcon icon={faFaceMeh} className="ml-[2rem]" />
          </h1>
          <Button
            text="Add a new post"
            onAction={() => setNewPostForm((prev) => !prev)}
            styles="py-[1rem] px-[4rem] block mx-auto mt-[2rem]"
          />
        </div>
      )}
      {newPostForm && (
        <Modal
          onClose={() => {
            setChosenPost(null);
            setNewPostForm((prev) => !prev);
          }}
        >
          <AddNewPost
            posts={posts}
            setPosts={setPosts}
            onClose={() => {
              setChosenPost(null);
              setNewPostForm((prev) => !prev);
            }}
            chosenPost={chosenPost}
          />
        </Modal>
      )}
      {posts.length !== 0 && !newPostForm && (
        <>
          <h1 className="font-bebas text-[2.5rem] md:text-[4rem] xl:text-[3rem] text-[#bbb] font-bold tracking-[0.1rem] p-[1rem] text-center rounded-[1rem]">
            My Blog
          </h1>
          <ul className="flex flex-wrap gap-[1rem] xl:gap-[1.2rem] h-[calc(100%-4.5rem)] xl:h-[calc(100%-5rem)] px-[1.2rem] content-start justify-between overflow-auto scrollbar-hide scrollbar-show scrollbar-w-4 scrollbar-thumb">
            {posts.map((post) => (
              <li
                className="flex-[0_1_calc(50%-0.6rem)] rounded-[1rem] relative cursor-pointer h-auto group"
                key={post.id}
                onClick={() => setChosenPost(post)}
              >
                <img
                  className="w-full h-full object-cover rounded-[1rem] opacity-50"
                  src={post.img}
                  alt={post.title}
                />
                <h3 className="w-full absolute bottom-0 left-0 p-[1rem] bg-[rgba(0,0,0,0.5)] rounded-b-[1rem] text-[1.4rem] md:text-[2.5rem] md:min-h-[5rem] xl:min-h-[3rem] xl:text-[1.6rem] font-light uppercase leading-[1.4rem] xl:leading-[1.6rem] text-[#fff] md:pt-[2rem] xl:pt-[1rem]">
                  {post.title.length > 50
                    ? post.title.slice(0, 50) + "..."
                    : post.title}
                </h3>
                <div className="absolute top-[0.5rem] right-[0.5rem] xl:top-[1rem] xl:right-[1rem] flex justify-center gap-x-[0.8rem] xl:gap-x-[1rem] opacity-80 xl:opacity-0 transition-all xl:invisible duration-300 group-hover:opacity-100 xl:group-hover:visible">
                  <button
                    className="bg-transparent border-0 text-[2.1rem] md:text-[3rem] xl:text-[2.5rem] text-[#fff] cursor-pointer"
                    onClick={() => setNewPostForm((prev) => !prev)}
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    className="bg-transparent border-0 text-[2.1rem] md:text-[3rem] xl:text-[2.5rem] text-[#fff] cursor-pointer"
                    onClick={() => {
                      setDeletedPost(post);
                      setConfirmation((prev) => !prev);
                    }}
                  >
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MyBlog;
