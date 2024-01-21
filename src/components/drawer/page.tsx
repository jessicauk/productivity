import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

interface Route {
  title: string;
  href: string;
}
interface DrawerProps {
  handleDrawerToggle: () => void;
  navItems: Route[];
}

export default function MenuDrawer({
  handleDrawerToggle,
  navItems,
}: DrawerProps) {
  return (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="bg-teal-600 dark:text-white min-h-screen"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <Link href={`${item.href}`} className="w-full">
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
