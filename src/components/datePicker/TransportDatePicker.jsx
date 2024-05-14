import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import startOfDay from "date-fns/startOfDay";
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export default function TransportScheduleDatePicker({values, setValues}) {
  const findDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.find((item) => item.getTime() === dateTime);
  };

  const findIndexDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.findIndex((item) => item.getTime() === dateTime);
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!values) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = findDate(values, date);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        selected={selected}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={values}
        onChange={(newValue) => {
          const array = [...values];
          const date = startOfDay(newValue);
          const index = findIndexDate(array, date);
          if (index >= 0) {
            array.splice(index, 1);
          } else {
            array.push(date);
          }
          setValues(array);
        }}
        renderDay={renderPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
        disablePast
      />
    </LocalizationProvider>
  );
}
