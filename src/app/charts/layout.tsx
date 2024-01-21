"use client";
import React from "react";
import { Roboto } from "next/font/google";
import PageLayout from "@/components/layout/page";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-white dark:bg-slate-800 grid grid-cols-12 grid-flow-row gap-2">
      <PageLayout>
        <main className="my-8 px-8 w-full">{children}</main>
      </PageLayout>
    </div>
  );
}
