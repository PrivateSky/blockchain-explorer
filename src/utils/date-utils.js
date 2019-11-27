import moment from "moment";

export function shortDate(date) {
  if (!date || typeof date != "string") return "";
  date = moment(date);

  return date.format("YYYY-MM-DD");
}

export function longDate(date) {
  if (!date || typeof date != "string") return "";
  date = moment(date);

  return date.format("YYYY-MM-DD HH:mm:ss");
}
