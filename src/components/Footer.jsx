const Footer = () => {
  return (
    <footer className="w-full min-h-[4rem] md:min-h-[6rem] xl:min-h-[5rem] bg-[#111214] flex items-center justify-between px-[2rem] xl:px-[4rem] text-[1.7rem] md:text-[2.5rem] xl:text-[2rem] text-[#bbb] md:pt-[2rem] md:pb-[2rem] xl:pt-0 xl:pb-0 font-light rounded-b-[1rem] rounded-tl-none rounded-tr-none">
      <p className="font-bebas">
        <span>News & Blogs App</span>
      </p>
      <p className="text-[1rem] md:text-[2rem] xl:text-[1.4rem] ">
        &copy; All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
