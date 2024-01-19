import React from "react";
import { Roboto } from "next/font/google";
import Header from "@/components/header/page";
import { MenuList, MenuItem, Divider } from "@mui/material";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import MenuDrawer from "@/components/drawer/page";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
//   window?: () => Window;

export default function Layout({ children }: { children: React.ReactNode }) {
  const container = window.document.body;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-12 grid-flow-row gap-2">
      <Header
        navItems={navItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <aside className="col-span-2">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
            handleDrawerToggle={handleDrawerToggle}
            navItems={navItems}
          />
        </Drawer>
      </aside>
    </div>
  );
}
