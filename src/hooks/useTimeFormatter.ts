interface TimeFormat {
  hours: string;
  minutes: string;
  seconds: string;
  time: string;
}

export function useTimeFormatter(seconds: number): TimeFormat {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${sec}`;
  return { hours, minutes, seconds: sec, time };
}
