interface TaskPageProps {
  params: {
    taskId: string;
  };
}
export default function TaskPage({ params }: TaskPageProps) {
  return <div>{params.taskId}</div>;
}
