import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledTimepicker } from "./styles";

type FormState = {
  title: string;
  description: string;
  duration: string;
  priority: string;
  selectedTime: Date | null;
};

interface FormProps {
  handleSubmit: (data: FormState) => void;
  handleClose: () => void;
}
export default function Form(props: FormProps) {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    duration: "",
    priority: "",
    selectedTime: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    props.handleSubmit(data);
    props.handleClose();
  };

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
        {...register("title", { required: true })}
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
        {...register("description")}
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
          Duration
        </InputLabel>
        <Select
          id="duration"
          {...register("duration", { required: true })}
          inputProps={{ className: "dark:text-white" }}
          value={formState.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          label="Duration"
          className="dark:text-white custom-outline"
        >
          <MenuItem value="30">30 mins</MenuItem>
          <MenuItem value="45">45 mins</MenuItem>
          <MenuItem value="60">1 hr</MenuItem>
          <MenuItem value="custom">custom</MenuItem>
        </Select>
      </FormControl>

      {formState.duration === "custom" && (
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <StyledTimepicker
                slotProps={{
                  textField: {
                    className: "dark:text-white w-full",
                  },
                }}
                views={["hours", "minutes", "seconds"]}
                format="mm:ss"
                label="Custom Time"
                className="dark:text-white custom-outline custom-timepicker"
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <InputLabel className="dark:text-white">Priority</InputLabel>
        <Select
          id="priority"
          {...register("priority", { required: true })}
          inputProps={{ className: "dark:text-white" }}
          value={formState.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          label="Priority"
          className="dark:text-white custom-outline"
        >
          <MenuItem value="1">High</MenuItem>
          <MenuItem value="2">Medium</MenuItem>
          <MenuItem value="3">Low</MenuItem>
        </Select>
      </FormControl>

      <Box className="flex justify-end my-8">
        <Button
          autoFocus
          onClick={props.handleClose}
          variant="text"
          className="text-white hover:text-teal-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          autoFocus
          variant="contained"
          className="bg-teal-300 text-white hover:bg-teal-600"
        >
          Create
        </Button>
      </Box>
    </form>
  );
}
