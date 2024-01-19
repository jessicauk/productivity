"use client";
import { Roboto } from "next/font/google";
import Header from "@/components/header/page";
// TO DO import { MenuList, MenuItem, Divider } from "@mui/material";
// TO DO import Link from "next/link";
import React from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 grid grid-cols-12 grid-flow-row gap-2">
      <Header
        navItems={["Home", "Charts", "History"]}
        mobileOpen={false}
        setMobileOpen={() => null}
      />
      {/* <Header />
      <aside className="col-span-2">
        <MenuList>
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Link href="/tasks">Tasks</Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Link href="/history">History</Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Link href="/charts">Stats</Link>
          </MenuItem>
        </MenuList>
      </aside> */}
      <main className="col-span-12 my-8 px-8">{children}</main>
    </div>
  );
}
