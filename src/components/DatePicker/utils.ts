import day from "utils/day"

export const formatDate = (date: Date, format: string) => {
  return day(date).format(format)
}

export const parseDate = (str: string, format: string) => {
  return day(str, format).toDate()
}
