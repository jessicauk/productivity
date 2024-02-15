import React from "react";
import { Roboto } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { toggle, selectIsMenuOpen } from "@/features/settings/settingsSlice";

import Header from "@/components/header/page";
import Drawer from "@mui/material/Drawer";
import MenuDrawer from "@/components/drawer/page";

interface Props {
  children: React.ReactNode;
  window?: () => Window;
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const drawerWidth = "80%";
const navItems = [
  { title: "Home", href: "/tasks" },
  { title: "Charts", href: "/charts" },
  { title: "History", href: "/history" },
];

export default function Layout({ children, window }: Props) {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const isOpenMenu = useSelector(selectIsMenuOpen);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggle());
  };

  return (
    <div className="col-span-full w-full h-full min-h-screen bg-white dark:bg-slate-800 grid grid-flow-row grid-cols-1 gap-2">
      <Header navItems={navItems} setMobileOpen={() => handleDrawerToggle()} />
      <Drawer
        container={container}
        variant="temporary"
        open={isOpenMenu}
        onClose={() => handleDrawerToggle()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <MenuDrawer
          handleDrawerToggle={() => handleDrawerToggle()}
          navItems={navItems}
        />
      </Drawer>
      {children}
    </div>
  );
}
