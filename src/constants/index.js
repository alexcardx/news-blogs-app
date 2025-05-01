export const categories = [
  "General",
  "World",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
  "Nation",
  "Bookmarks",
];

export const weatherIcons = {
  Clear: "bx bx-sun",
  Clouds: "bx bx-cloud",
  Rain: "bx bx-cloud-rain",
  Drizzle: "bx bx-cloud-drizzle",
  Thunderstorm: "bx bx-cloud-lightning",
  Snow: "bx bx-cloud-snow",
  Mist: "bx bx-water",
  Smoke: "bx bx-wind",
  Haze: "bx bx-water",
  Dust: "bx bx-wind",
  Fog: "bx bx-cloud",
  Sand: "bx bx-wind",
  Ash: "bx bx-hot",
  Squall: "bxs bx-wind",
  Tornado: "bxs bx-wind",
};

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const API_KEY_NEWS = import.meta.env.VITE_API_KEY_NEWS;
export const API_KEY_WEATHER = import.meta.env.VITE_API_KEY_WEATHER;
export const BASE_URL_NEWS = "https://gnews.io/api/v4/top-headlines";
export const BASE_URL_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather";
export const BASE_URL_CITY_COORDS =
  "https://api.openweathermap.org/geo/1.0/direct";
export const initialCategory = categories[0].toLocaleLowerCase();
export const initialCity = "Moscow";
