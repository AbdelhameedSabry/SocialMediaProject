export default function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Get month with leading zero
  const day = ("0" + date.getDate()).slice(-2); // Get day with leading zero

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
