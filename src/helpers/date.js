export const getDateFormat = (timestamp = new Date()) => {
  let day = String(new Date(String(timestamp)).getDate());
  if (String(new Date(String(timestamp)).getDate()).length < 2) {
    day = "0" + String(new Date(String(timestamp)).getDate());
  }
  let month = String(new Date(String(timestamp)).getMonth() + 1);
  if (String(new Date(String(timestamp)).getMonth() + 1).length < 2) {
    month = "0" + String(new Date(String(timestamp)).getMonth() + 1);
  }

  return String(
    new Date(String(timestamp)).getFullYear() + "-" + month + "-" + day
  );
};

export const getRegularDate = (timestamp = new Date()) => {
  return (
    new Date(timestamp).getDate() +
    "/" +
    new Date(timestamp).getMonth() +
    1 +
    "/" +
    new Date(timestamp).getFullYear()
  );
};

export const getYears = (limit = 8) => {
  let firstYear = 2015;
  return Array(limit)
    .fill("")
    .map(() => {
      firstYear += 1;
      return String(firstYear);
    });
};

export const thisYear = getDateFormat(
  String(new Date(String(new Date().getFullYear() - 1)))
);
export const nextYear = getDateFormat(
  String(new Date(String(new Date().getFullYear() + 1)))
);

var date = new Date();
export const startOfMonth = getDateFormat(
  String(new Date(date.getFullYear(), date.getMonth(), 1))
);
export const endOfMonth = getDateFormat(
  String(new Date(date.getFullYear(), date.getMonth() + 1, 0))
);

export const today = getDateFormat(String(new Date()));

export const todayTimeStamp = String(new Date());
export const todayDate = new Date();
export const todayTime = todayDate.getTime();

export const dateFilters = {
  LAST_THREE_MONTH: "LAST_THREE_MONTH",
};

export const timestamps = {
  LAST_THREE_MONTH: 7862400000,
};

export const dateFilter = (timestamp = todayTimeStamp, type = "") => {
  const givenDate = new Date(timestamp);
  const givenTime = givenDate.getTime();
  switch (type) {
    case dateFilters.LAST_THREE_MONTH:
      if (todayTime - givenTime <= timestamps.LAST_THREE_MONTH) {
        return true;
      }
      break;

    default: {
      return false;
    }
  }
};

export const getMonth = (timestamp = todayTimeStamp) => {
  return new Date(timestamp).getMonth();
};

export const isThisMonth = (givenTimeStamp = todayTimeStamp) => {
  const givenMonth = new Date(String(givenTimeStamp)).getMonth();
  const givenYear = new Date(String(givenTimeStamp)).getFullYear();

  const thisMonth = new Date(String(todayTimeStamp)).getMonth();
  const thisYear = new Date(String(todayTimeStamp)).getFullYear();

  return givenMonth === thisMonth && givenYear === thisYear;
};

export const isLastMonth = (givenTimeStamp = todayTimeStamp) => {
  const givenMonth = new Date(String(givenTimeStamp)).getMonth();
  const givenYear = new Date(String(givenTimeStamp)).getFullYear();

  const thisMonth = new Date(String(todayTimeStamp)).getMonth();
  const thisYear = new Date(String(todayTimeStamp)).getFullYear();

  return givenMonth === thisMonth - 1 && givenYear === thisYear;
};

export const isBefore = (before = todayTimeStamp, after = todayTimeStamp) => {
  const beforeDate = new Date(before);
  const afterDate = new Date(after);
  return afterDate.getTime() > beforeDate.getTime();
};

export const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDate = (date) => {
  const givenTime = new Date(String(date));
  const formattedDate =
    monthList[givenTime.getMonth()] +
    " " +
    givenTime.getDate() +
    ", " +
    givenTime.getFullYear();
  if (!date || formattedDate.length < 11) {
    return "";
  } else {
    return Boolean(date) && date.length > 0 && typeof date === "string"
      ? formattedDate
      : "";
  }
};
