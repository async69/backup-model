export const FilterByName = (
  data = [],
  tag = "name",
  searchValue = "",
  fullScan = false
) => {
  var filteredData = undefined;
  if (searchValue.length > 0) {
    filteredData = data.filter((item) => {
      const identifier = fullScan ? "" : "^";
      try {
        return (
          searchValue &&
          String(item[tag]).match(new RegExp(identifier + searchValue, "gi"))
        );
      } catch (err) {
        console.error(`Tag does not exist: ${String(err)}`);
      }
      return null;
    });
  }
  return typeof filteredData === "undefined" ? data : filteredData;
};

export const FilterByDate = (
  data = [],
  tag = "posting_date",
  startDate = "",
  endDate = ""
) => {
  var filteredData = undefined;
  if (startDate.length > 0 && endDate.length > 0) {
    filteredData = data.filter((item) => {
      try {
        const dateItem = new Date(item[tag]).getTime();
        const dateStart = new Date(startDate).getTime();
        const dateEnd = new Date(endDate).getTime();
        return (
          startDate && endDate && dateItem <= dateEnd && dateItem >= dateStart
        );
      } catch (err) {
        console.error(`Tag does not exist: ${String(err)}`);
      }
      return null;
    });
  }
  return typeof filteredData === "undefined" ? data : filteredData;
};

export const FilterByProperty = (
  data = [],
  tag = "country",
  searchValue = "",
  arrayTag = "addresses",
  fullScan = false
) => {
  var filteredData = undefined;
  if (searchValue.length > 0) {
    filteredData = data.filter((item) => {
      const identifier = fullScan ? "" : "^";
      try {
        const index = item[arrayTag].findIndex((prop) =>
          prop[tag].match(new RegExp(identifier + searchValue, "gi"))
        );
        return searchValue && index >= 0;
      } catch (err) {
        console.error(`Tag does not exist: ${String(err)}`);
      }
      return null;
    });
  }
  return typeof filteredData === "undefined" ? data : filteredData;
};
