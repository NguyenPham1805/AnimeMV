import { Component, EventEmitter, Output, Input } from "@angular/core";
import { Anime } from "src/types";

@Component({
  selector: "app-nav-carousel",
  templateUrl: "./nav-carousel.component.html",
  styleUrls: ["./nav-carousel.component.css"],
})
export class NavCarouselComponent {
  @Input() slidesSource!: Anime[];
  @Input() index!: number;

  @Output() handleSetIndex = new EventEmitter<number>();

  setIndex(i: number) {
    this.handleSetIndex.emit(i);
  }
}
