export const monthNames = Array.from({ length: 12 }, (x, index) =>
  new Date(0, index).toLocaleDateString("en-US", { month: "long" })
);

export const weekdays = Array.from({ length: 7 }, (x, index) =>
  new Date(0, 0, index).toLocaleDateString("en-US", { weekday: "long" })
);

export const monthName = month =>
  new Date(0, month).toLocaleDateString("en-US", { month: "long" });

export const isLeapYear = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
export const daysInMonth = (month, year) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else {
    return days[month];
  }
};

export const arrayFrom = (start, finish) => {
  return Array(finish).fill();
};
