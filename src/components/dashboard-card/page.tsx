interface DasboardCardProps {
  title: string;
  count: number;
  backgroundColor?: string;
}
export default function DasboardCard({
  title,
  count,
  backgroundColor = "bg-cyan-300",
}: DasboardCardProps) {
  return (
    <div
      className={`flex flex-col justify-center items-stretch text-center min-h-40 rounded-3xl ${backgroundColor}`}
    >
      <h1 className="font-bold text-white text-xl">{title}</h1>
      <h2 className="font-bold text-7xl text-white">{count}</h2>
    </div>
  );
}
