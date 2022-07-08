import React, { useRef, useState, useEffect } from "react"
import { DayPickerInputProps, DayPickerProps } from "react-day-picker/types"
import DayPickerInputType from "react-day-picker/types/DayPickerInput"
import Form, { InputGroup, Append } from "components/Form"
import { FormInputProps } from "../../Form/FormInput"
import Icon from "components/Icon"
import day from "utils/day"
import { formatDate, parseDate } from "../utils"
import styled from "./DatePicker.module.scss"

// https://github.com/gpbl/react-day-picker/issues/1194#issuecomment-814065458
import DPI from "react-day-picker/DayPickerInput"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DayPickerInput = DPI.__esModule ? DPI.default : DPI

export type DatePickerProps = {
  /**
   * Date value.
   */
  date?: Date
  /**
   * Min selectable date.
   */
  minDate?: Date
  /**
   * Max selectable date.
   */
  maxDate?: Date
  /**
   * Date format.
   */
  dateFormat?: string
  /**
   * Default input placeholder.
   */
  placeholder?: string
  /**
   * Disabled input box.
   */
  disabled?: boolean
  /**
   * Callback when date change.
   */
  onChange?: (date: Date) => void
  /**
   * Props for the attributes of input.
   */
  inputProps?: FormInputProps
}

const DatePicker = ({ dateFormat = "YYYY-MM-DD", inputProps, ...props }: DatePickerProps) => {
  const [date, setDate] = useState(props.date)
  const datePickerInputRef = useRef<DayPickerInputType>(null)

  const dayPickerProps: DayPickerProps = {
    weekdaysShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    onDayClick: (date: Date, { disabled }) => {
      if (disabled) return
      setDate(date)
      props?.onChange && props.onChange(date)
    },
  }
  if (props?.maxDate) {
    dayPickerProps.disabledDays = {
      after: props.maxDate,
    }
  }
  if (props?.minDate) {
    dayPickerProps.disabledDays = {
      ...dayPickerProps.disabledDays,
      before: props.minDate,
    }
  }

  useEffect(() => {
    props.date && setDate(props.date)
  }, [props.date])

  return (
    <div>
      <DayPickerInput
        classNames={{
          container: styled.container,
          overlay: styled.overlay,
          overlayWrapper: styled.overlayWrapper,
        }}
        style={{ width: "250px" }}
        value={date}
        format={dateFormat}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={props.placeholder || day(new Date()).format(dateFormat)}
        component={React.forwardRef(function FormInput(
          props: DayPickerInputProps["component"],
          ref,
        ) {
          return (
            <InputGroup className={styled["input-group"]}>
              <Form.Input ref={ref} {...props} />
              <Append className={styled.icon}>
                <Icon name="calendar" />
              </Append>
            </InputGroup>
          )
        })}
        dayPickerProps={dayPickerProps}
        inputProps={{
          ref: datePickerInputRef,
          readOnly: true,
          disabled: props.disabled,
          style: {
            cursor: "pointer",
          },
          ...inputProps,
        }}
      />
    </div>
  )
}

DatePicker.display = DatePicker

export default DatePicker
