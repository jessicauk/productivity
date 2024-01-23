import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { TimeField } from "@mui/x-date-pickers/TimeField";

export const StyledSelect = styled(Select)(() => ({
  "& .custom-outlined": {
    color: "#fff",
    "& svg": {
      color: "#fff",
    },
  },
}));

export const StyledTimeField = styled(TimeField)(() => ({
  root: {
    borderColor: "red",
  },
}));
