import React from "react";
import {
  LocalizationProvider as XLocalizationProvider,
  LocalizationProviderProps,
} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type LocalizationProviderPropsWithDayjs = LocalizationProviderProps<Dayjs, any>;

const LocalizationProvider: React.FC<LocalizationProviderPropsWithDayjs> = (
  props
) => {
  return (
    <XLocalizationProvider dateAdapter={AdapterDayjs} {...props}>
      {props.children}
    </XLocalizationProvider>
  );
};

export default LocalizationProvider;
