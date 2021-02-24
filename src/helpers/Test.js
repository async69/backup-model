const data = [
  {
    document_number: "aaaa",
    name: "new",
  },
  {
    document_number: "aaaa",
    name: "one",
  },
  {
    document_number: "bbb",
    name: "two",
  },
]; // data

// example
const a = {
  aaaa: [0],
};

const pairs = {};
const label = "document_number";
data.forEach((item, idx) => {
  const keys = Object.keys(pairs);
  const index = keys.findIndex((key) => key === item[label]);
  if (index >= 0) {
    pairs[item[label]].push(idx)
  } else {
    pairs[item[label]] = [idx]
  }
});

