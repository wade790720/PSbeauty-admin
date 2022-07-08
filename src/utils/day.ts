import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import duration from "dayjs/plugin/duration"
import customParseFormat from "dayjs/plugin/customParseFormat"
import dayjs, { ConfigType } from "dayjs"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(customParseFormat)

const day = (config?: ConfigType, format?: string, strict?: boolean) => {
  // return dayjs.utc(date, "America/New_York") //.tz("America/New_York")
  return dayjs.utc(config, format, strict)
}

day.duration = dayjs.duration

export default day
