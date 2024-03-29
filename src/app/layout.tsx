import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import RootProvider from "./root-provider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Productivity App",
  description: "Homepage for Productivity App",
  keywords: "productivity, app, todo, tasks, time, management, pomodoro, timer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={roboto.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
