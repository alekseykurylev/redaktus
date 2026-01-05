import {
  format,
  formatDistanceStrict,
  isYesterday,
  differenceInCalendarDays,
  differenceInHours,
} from "date-fns"
import { ru } from "date-fns/locale/ru"

function isDayBeforeYesterday(date: Date, baseDate = new Date()) {
  return differenceInCalendarDays(baseDate, date) === 2
}

export function formatSmartDate(date: Date, baseDate = new Date()) {
  const diffHours = Math.abs(differenceInHours(baseDate, date))

  if (diffHours < 24) {
    return formatDistanceStrict(date, baseDate, {
      locale: ru,
      addSuffix: true,
    })
  }

  if (isYesterday(date)) {
    return "вчера"
  }

  if (isDayBeforeYesterday(date, baseDate)) {
    return "позавчера"
  }

  return format(date, "d MMMM yyyy", { locale: ru })
}
