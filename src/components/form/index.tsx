import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FormState) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

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
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        InputLabelProps={{ className: "dark:text-white custom-outline" }}
        InputProps={{
          className: "dark:text-white border-white custom-outline",
        }}
        className="border-white custom-outline"
        label="Title"
        value={formState.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        margin="normal"
        fullWidth
        autoFocus
      />
      <TextField
        InputLabelProps={{ className: "dark:text-white custom-outline" }}
        InputProps={{
          className: "dark:text-white border-white custom-outline",
        }}
        className="border-white custom-outline"
        label="Description"
        value={formState.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        margin="normal"
        fullWidth
        multiline
      />
      <FormControl fullWidth margin="normal">
        <InputLabel className="dark:text-white custom-outline">
          Option
        </InputLabel>
        <Select
          inputProps={{ className: "dark:text-white bg-transparent" }}
          value={formState.option}
          onChange={(e) => handleInputChange("option", e.target.value)}
          label="Option"
          className="dark:text-white custom-outline bg-transparent"
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel className="dark:text-white">Priority</InputLabel>
        <Select
          id="priority"
          inputProps={{ className: "dark:text-white custom-menu-list" }}
          value={formState.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          label="Priority"
          className="dark:text-white custom-outline custom-menu-list"
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
      <input type="submit" />
    </form>
  );
}
