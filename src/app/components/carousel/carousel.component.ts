import { Component, Input, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { interval } from "rxjs";
import { Anime } from "src/types";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})
export class CarouselComponent implements OnInit {
  @Input() isLoading!: boolean;
  @Input() slides!: Anime[];
  faEye: IconDefinition = faEye;
  faArrowLeft: IconDefinition = faChevronCircleLeft;
  faArrowRight: IconDefinition = faChevronCircleRight;

  index: number = 0;

  ngOnInit(): void {
    interval(5000).subscribe(() => {
      this.index++;
      this.checkValidIndex();
    });
  }

  constructor() {}

  getClasNameByIndex(i: number): string {
    if (i === this.index) {
      return "active";
    }
    if (
      i === this.index - 1 ||
      (this.index === 0 && i === this.slides.length - 1)
    ) {
      return "prev";
    }
    return "next";
  }

  handleSetIndex(i: number): void {
    this.index = i;
  }

  setIndex(i: number) {
    this.index = i;
  }

  handleBtnPrevClick() {
    this.index -= 1;
    this.checkValidIndex();
  }

  handleBtnNextClick() {
    this.index += 1;
    this.checkValidIndex();
  }

  checkValidIndex() {
    if (this.index > 6) this.index = 0;
    if (this.index < 0) this.index = 6;
  }
}
