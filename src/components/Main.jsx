import Navbar from "./Navbar";
import News from "./News";
import MyBlog from "./MyBlog";
import Widgets from "./Widgets";
import { useState } from "react";

const Main = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );

  return (
    <main className="flex flex-col h-auto xl:flex-row gap-[2rem] xl:px-[2rem] xl:h-[calc(100%-16rem)]">
      <Navbar posts={posts} setPosts={setPosts} />
      <News />
      <MyBlog posts={posts} setPosts={setPosts} />
      <Widgets />
    </main>
  );
};

export default Main;
