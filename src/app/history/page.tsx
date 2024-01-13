"use client";
import { useRouter } from "next/navigation";

/* export const metadata = {
  title: "history page",
}; */

export default function History() {
  const router = useRouter();
  return (
    <div>
      History<button onClick={() => router.push("/")}>Go back!</button>
    </div>
  );
}
