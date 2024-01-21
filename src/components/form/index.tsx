import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// TO DO
// import TimePicker from "@mui/lab/TimePicker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";

type FormState = {
  title: string;
  description: string;
  option: string;
  priority: string;
  selectedTime: Date | null;
};
export default function Form() {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    option: "",
    priority: "",
    selectedTime: null,
  });

  const handleInputChange = <K extends keyof FormState>(
    fieldName: K,
    value: FormState[K]
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        label="Title"
        value={formState.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Description"
        value={formState.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        margin="normal"
        fullWidth
        multiline
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Option</InputLabel>
        <Select
          value={formState.option}
          onChange={(e) => handleInputChange("option", e.target.value)}
          label="Option"
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          value={formState.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          label="Priority"
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
