import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <Link href="/">Go Back Home</Link>
    </div>
  );
}
