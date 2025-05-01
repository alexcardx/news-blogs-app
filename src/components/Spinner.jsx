const Spinner = ({ size }) => {
  return (
    <div className="h-full flex items-center justify-center bg-text[#111214]">
      <div
        style={size}
        className="w-[7rem] xl:w-[9rem] h-[7rem] xl:h-[9rem] rounded-full bg-conic-gradient animate-rotate"
      ></div>
    </div>
  );
};

export default Spinner;
