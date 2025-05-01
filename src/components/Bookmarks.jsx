import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import NewsItemModal from "./NewsItemModal";
import Modal from "./Modal";
import BookmarksList from "./BookmarksList";

const Bookmarks = ({
  userBookmarks,
  setUserBookmarks,
  setSelectedCategory,
}) => {
  const [confirmation, setConfirmation] = useState(false);
  const [deletedBookmark, setDeletedBookmark] = useState(null);
  const [bookmarkedChosenArticle, setBookmarkedChosenArticle] = useState(null);

  const handleConfirmation = (bookmark) => {
    setDeletedBookmark(bookmark);
    setConfirmation((prev) => !prev);
  };

  const handleDeleteBookmark = () => {
    const updatedBookmarks = userBookmarks.filter(
      (item) => item.title !== deletedBookmark.title
    );

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setUserBookmarks(updatedBookmarks);
    setConfirmation((prev) => !prev);
  };

  return (
    <>
      {bookmarkedChosenArticle && (
        <Modal
          onClose={() => setBookmarkedChosenArticle(false)}
          confirmation={confirmation}
        >
          <NewsItemModal
            onClose={() => setBookmarkedChosenArticle(false)}
            chosenArticle={bookmarkedChosenArticle}
          />
        </Modal>
      )}
      {!bookmarkedChosenArticle && (
        <Modal
          heading={"Bookmarked News"}
          onClose={() => setSelectedCategory(null)}
          confirmation={confirmation}
        >
          <BookmarksList
            userBookmarks={userBookmarks}
            handleConfirmation={handleConfirmation}
            setBookmarkedChosenArticle={setBookmarkedChosenArticle}
          />
        </Modal>
      )}
      {confirmation && (
        <DeleteConfirmation
          title={"Delete confirmation"}
          message={
            "Are you sure you want to delete this news from your bookmarks?"
          }
          onConfirm={handleDeleteBookmark}
          onCancel={() => setConfirmation((prev) => !prev)}
        />
      )}
    </>
  );
};

export default Bookmarks;
