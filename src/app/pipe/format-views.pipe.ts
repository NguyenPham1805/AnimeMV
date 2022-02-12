import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatViews",
})
export class FormatViewsPipe implements PipeTransform {
  transform(x: string | number | undefined) {
    if (!x && x !== 0) return "";

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
