import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time",
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return "00:00";
    let currentHour = Math.floor(value / 60 / 60);
    let currentMin = Math.floor((value / 60) % 60);
    let currentSec = Math.floor(value % 60);

    currentHour < 10
      ? ((currentHour as unknown as string) = "0" + currentHour)
      : currentMin;
    currentMin < 10
      ? ((currentMin as unknown as string) = "0" + currentMin)
      : currentMin;
    currentSec < 10
      ? ((currentSec as unknown as string) = "0" + currentSec)
      : currentSec;
    if (value >= 3600) return `${currentHour}:${currentMin}:${currentSec}`;
    return `${currentMin}:${currentSec}`;
  }
}
