import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, Button, FormHelperText } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import { TaskForm, TaskResponse } from "../../interfaces";
import { timeToSeconds } from "../../utils/timeToSeconds";
import { useTimeFormatter } from "@/hooks/useTimeFormatter";

interface FormProps {
  handleSubmit: (data: TaskForm) => void;
  handleClose: () => void;
  data?: TaskResponse;
}

export default function Form(props: FormProps) {
  const { getTimeFormat } = useTimeFormatter();

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<TaskForm>({
    defaultValues: {
      title: props?.data?.title || "",
      description: props?.data?.description || "",
      duration: props?.data?.duration ? "custom" :"",
      priorityId: props?.data?.priorityId.toString() || "",
      durationCustom: dayjs(
        getTimeFormat(props?.data?.duration || 0).time,
        "HH:mm:ss"
      ),
    },
  });

  watch("duration");

  const formValues = control._formValues;

  const onSubmit: SubmitHandler<TaskForm> = (data: TaskForm) => {
    props.handleSubmit(data);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              InputLabelProps={{ className: "dark:text-white custom-outline" }}
              InputProps={{
                className: "dark:text-white border-white custom-outline",
              }}
              className="border-white custom-outline"
              label="Title"
              margin="normal"
              fullWidth
              autoFocus
              error={errors.title?.type === "required" && !field.value}
              helperText={
                errors.title?.type === "required" && !field.value
                  ? "Title is required"
                  : ""
              }
            />
          );
        }}
        control={control}
      />

      <Controller
        name="description"
        render={({ field }) => {
          return (
            <TextField
              {...field}
              InputLabelProps={{ className: "dark:text-white custom-outline" }}
              InputProps={{
                className: "dark:text-white border-white custom-outline",
              }}
              className="border-white custom-outline"
              label="Description"
              margin="normal"
              fullWidth
              multiline
            />
          );
        }}
        control={control}
      />

      <FormControl
        fullWidth
        margin="normal"
        error={errors.title?.type === "required"}
      >
        <InputLabel className="dark:text-white custom-outline">
          Duration
        </InputLabel>
        <Controller
          name="duration"
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                id="duration"
                inputProps={{ className: "dark:text-white" }}
                label="Duration"
                className="dark:text-white custom-outline"
                error={errors.duration?.type === "required"}
              >
                <MenuItem value="30">30 mins</MenuItem>
                <MenuItem value="45">45 mins</MenuItem>
                <MenuItem value="60">1 hr</MenuItem>
                <MenuItem value="custom">custom</MenuItem>
              </Select>
            );
          }}
          control={control}
        />

        {errors.duration?.type === "required" && (
          <FormHelperText>Duration is required</FormHelperText>
        )}
      </FormControl>

      {formValues.duration === "custom" && (
        <FormControl
          fullWidth
          margin="normal"
          error={
            (formValues.duration === "custom" &&
              errors.durationCustom?.type === "required") ||
            timeToSeconds(formValues.durationCustom?.toString() ?? "") > 7200
          }
        >
          <Controller
            name="durationCustom"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimeField"]}>
                    <TimeField
                      {...field}
                      slotProps={{
                        textField: {
                          className: "dark:text-white w-full",
                        },
                      }}
                      ampm={false}
                      format="HH:mm:ss"
                      label="Custom Time"
                      className="dark:text-white custom-outline custom-timepicker"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              );
            }}
            control={control}
          />

          {errors.durationCustom?.type === "required" && (
            <FormHelperText>Duration is required</FormHelperText>
          )}
          {timeToSeconds(formValues.durationCustom?.toString() ?? "") >
            7200 && (
            <FormHelperText className="text-red-800">
              Duration should be less than 2hr
            </FormHelperText>
          )}
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <InputLabel className="dark:text-white">Priority</InputLabel>
        <Controller
          name="priorityId"
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                id="priority"
                inputProps={{ className: "dark:text-white" }}
                label="Priority"
                className="dark:text-white custom-outline"
              >
                <MenuItem value="1">High</MenuItem>
                <MenuItem value="2">Medium</MenuItem>
                <MenuItem value="3">Low</MenuItem>
              </Select>
            );
          }}
          control={control}
        />
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
          {props.data ? "Update" : "Create"}
        </Button>
      </Box>
    </form>
  );
}
