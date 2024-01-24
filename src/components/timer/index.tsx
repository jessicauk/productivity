import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTimeFormatter } from "@/hooks/useTimeFormatter";

interface TimerProps {
  duration: number;
}

export default function Timer({ duration = 200 }: TimerProps) {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const { getTimeFormat } = useTimeFormatter();
  const timeFormatter = getTimeFormat(time)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(duration);
    setIsRunning(false);
  };

  const stopTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="flex justify-between w-full">
      <h1>{timeFormatter.time}</h1>
      <div>
        {!isRunning && <PlayArrowIcon onClick={startTimer} />}
        {isRunning && <PauseIcon onClick={pauseTimer} />}
        <ReplayIcon onClick={resetTimer} />
        <StopIcon onClick={stopTimer} />
      </div>
    </div>
  );
}
