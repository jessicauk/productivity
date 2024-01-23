import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const StyledSelect = styled(Select)(() => ({
  "& .custom-outlined": {
    color: "#fff",
    "& svg": {
      color: "#fff",
    },
  },
}));

export const StyledTimepicker = styled(TimePicker)(() => ({
  root: {
    borderColor: "red",
  },
}));
