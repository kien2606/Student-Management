export const changeColorMark = (mark) => {
  if (mark >= 8) return "green";
  if (mark >= 5) return "goldenrod";
  return "red";
};

export const changeCustomText = (text) => {
  if (!text) return "";
  return `${text[0].toUpperCase()}${text.slice(1)}`;
};
