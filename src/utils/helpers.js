export const formateDate = (date) => {
  return date
    .split(".")
    .map((el, i, array) => {
      if (i !== array.length - 1) {
        return el.length < 2 ? `0${el}` : el;
      } else {
        return el;
      }
    })
    .join(".");
};

export const sortedDates = (a, b) => {
  const [dayA, monthA, yearA] = a.date.split(".").map(Number);
  const [dayB, monthB, yearB] = b.date.split(".").map(Number);

  const dateA = new Date(yearA, monthA - 1, dayA);
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateA - dateB;
};
