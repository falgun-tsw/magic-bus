import React from "react";
import { DatePicker as XDatePicker } from "@mui/x-date-pickers/DatePicker";
import type { DatePickerProps } from "@mui/x-date-pickers/DatePicker";

const DatePicker: React.FC<DatePickerProps<any>> = (props) => {
  return <XDatePicker {...props} />;
};

export default DatePicker;
