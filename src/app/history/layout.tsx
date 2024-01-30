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
    <PageLayout>
      <main className="my-8 px-8 w-full col-span-full">{children}</main>
    </PageLayout>
  );
}
