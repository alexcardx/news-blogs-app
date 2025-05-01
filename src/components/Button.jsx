const Button = ({ text, styles, onAction, type, children }) => {
  return (
    <button
      type={type}
      className={`text-[#000] text-[1.4rem] md:text-[2rem] border-0 cursor-pointer rounded-full bg-[#ad82f1] transition-all duration-200 ease-in-out hover:bg-[#905be7] hover:shadow-[0_8px_15px_rgba(0,0,0,0.2)] active:scale-95 ${styles} flex justify-center items-center gap-[0.5rem]`}
      onClick={onAction}
    >
      {text} {children}
    </button>
  );
};

export default Button;
