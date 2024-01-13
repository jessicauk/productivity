import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from '@mui/icons-material/Replay';

export default function Header() {
  return (
    <div className="bg-red-200 col-span-full">
      <nav className="flex justify-between">
        <Link href="/" className="font-bond text-3xl">
          Logo
        </Link>
        <div className="space-x-4 text-xl">
          <div className="flex">
            <div>
              <h2>Time <span>02:59:59</span></h2>
            </div>
            <PlayArrowIcon />
            <PauseIcon />
            <StopIcon />
            <ReplayIcon />
          </div>
        </div>
      </nav>
    </div>
  );
}
