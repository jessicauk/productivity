"use client";

import { useDispatch } from "react-redux";
import { toggle } from "@/features/settings/settingsSlice";
import Form from "@/components/form";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

type FormState = {
  title: string;
  description: string;
  duration: string;
  priority: string;
  selectedTime: Date | null;
};
export default function TaskPage({ params }: TaskPageProps) {
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggle());
  };

  return (
    <div>
      {params.taskId}
      <Form
        handleSubmit={(data: FormState) => console.log(data)}
        handleClose={handleDrawerToggle}
      />
    </div>
  );
}
