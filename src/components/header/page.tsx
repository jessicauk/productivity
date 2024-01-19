"use client";
import { useState } from "react";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, IconButton, Menu } from "@mui/material";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  navItems: string[];
  mobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
}

export default function Header({ navItems, mobileOpen, setMobileOpen }: Props) {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="col-span-full">
      {/* <nav className="flex justify-between text-slate-900 dark:text-white">
        <Link href="/" className="font-bond text-3xl ">
          Logo
        </Link>
        <div className="space-x-4 text-xl">
          <div className="flex">
            <div>
              <h2>
                Time <span>02:59:59</span>
              </h2>
            </div>
            <PlayArrowIcon />
            <PauseIcon />
            <StopIcon />
            <ReplayIcon />
          </div>
        </div>
      </nav> */}
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Productivity
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems?.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
