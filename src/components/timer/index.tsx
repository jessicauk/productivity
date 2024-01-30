import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import StopIcon from "@mui/icons-material/Stop";
import { useTimeFormatter } from "@/hooks/useTimeFormatter";
import { Task } from "@/interfaces";

interface TimerProps {
  duration: number;
  updateTime: (data: Partial<Task>) => void;
}

export default function Timer({ duration = 200, updateTime }: TimerProps) {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const { getTimeFormat } = useTimeFormatter();
  const timeFormatter = getTimeFormat(time);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      updateTime({ duration, done: true, timeSpent: duration - time });
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time, updateTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    updateTime({ duration: time, timeSpent: duration - time });
  };

  const resetTimer = () => {
    setTime(duration);
    updateTime({ duration });
    setIsRunning(false);
  };

  return (
    <div className="flex justify-between w-full">
      <h1>{timeFormatter.time}</h1>
      <div>
        {!isRunning && <PlayArrowIcon onClick={startTimer} />}
        {isRunning && <PauseIcon onClick={pauseTimer} />}
        <ReplayIcon onClick={resetTimer} />
        <StopIcon onClick={() => updateTime({ duration, timeSpent: time, done: true })} />
      </div>
    </div>
  );
}
