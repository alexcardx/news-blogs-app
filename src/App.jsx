import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SearchProvider from "./components/context/SearchProvider";
import CalendarProvider from "./components/context/CalendarProvider";

const App = () => {
  return (
    <div className="w-full min-h-screen h-[100vh] flex justify-center items-center bg-gradient-to-r from-[#b88efc] to-[#6877f4]">
      <div className="w-[95vw] max-w-[1980px] h-[95vh] xl:h-[95vmin] bg-[#060709] shadow-[0_20px_30px_rgba(0,0,0,0.8)] rounded-[1rem]">
        <div className="text-[1.5rem] xl:text-[2rem] text-white w-full flex flex-col justify-between gap-y-[1.5rem] xl:gap-y-[2rem] h-[100%] overflow-auto scrollbar-hide">
          <SearchProvider>
            <CalendarProvider>
              <Header />
              <Main />
            </CalendarProvider>
          </SearchProvider>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
