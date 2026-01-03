import { formatRelative } from "date-fns"
import { ru } from "date-fns/locale/ru"

export function formatDocDate(date: Date, baseDate: Date = new Date()) {
  return formatRelative(date, baseDate, { locale: ru })
}
