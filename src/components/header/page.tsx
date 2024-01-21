"use client";
import Link from "next/link";
/*
To DO 
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay"; */
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, IconButton } from "@mui/material";

interface Route {
  title: string;
  href: string;
}

interface Props {
  navItems: Route[];
  setMobileOpen: () => void;
}

export default function Header({ navItems, setMobileOpen }: Props) {
  const handleDrawerToggle = () => {
    setMobileOpen();
  };

  return (
    <div className="col-span-full">
      <AppBar className="bg-teal-600" component="nav" position="static">
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
              <Button key={item.title} sx={{ color: "#fff" }}>
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
