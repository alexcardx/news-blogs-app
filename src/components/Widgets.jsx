import Weather from "./Weather";
import Calendar from "./Calendar";

const Widgets = () => {
  return (
    <div className="flex flex-col xl:flex-col md:flex-row gap-x-[2rem] gap-y-[2rem] flex-1 xl:mx-0 md:mx-[2rem]">
      <Weather />
      <Calendar />
    </div>
  );
};

export default Widgets;
