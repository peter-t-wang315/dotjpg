
export const dateToString = (date) => {
  const dt = Date(date);
  return dt.toString().slice(0, 10);
}