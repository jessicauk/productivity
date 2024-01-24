export function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function minutesToSeconds(minutes: number): number {  
  return minutes * 60;
}
