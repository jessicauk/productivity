import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box className="flex justify-center">
      <CircularProgress className="dark:text-teal-600"/>
    </Box>
  );
}
